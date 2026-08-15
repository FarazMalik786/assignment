import { useAppNavigation } from '@hooks/useAppNavigation';
import { useVirtualizer } from '@tanstack/react-virtual';
import type { Call } from '@types';
import { useEffect, useRef, useState } from 'react';
import TableListItem from '@pages/CallsList/molecules/TableListItem';
import { useSearchParams } from 'react-router-dom';
import ListEmptyState from './ListEmptyState';
import CallsTableSkeletonLoader from './CallsTableSkeletonLoader';
import { useCallsStore } from '@store/callsStore';

const PAGE_LIMIT = 20;
const SCROLL_STATE_KEY = 'calls-scroll-state';

type ScrollState = {
    callId: string;
    index: number;
    page: number;
    scrollTop: number;
};

function CallsTableList() {
    const isLoading = useCallsStore((state) => state.isCallsLoading);
    const filteredCalls: Call[] = useCallsStore(
        (state) => state.filteredCalls
    );

    const { navigate } = useAppNavigation();
    const [searchParams] = useSearchParams();

    const parentRef = useRef<HTMLDivElement>(null);

    const [page, setPage] = useState(1);
    const [calls, setCalls] = useState<Call[]>(
        filteredCalls.slice(0, PAGE_LIMIT)
    );
    const [restoreIndex, setRestoreIndex] = useState<number | null>(null);


    /**
     * Virtualizer
     */
    const rowVirtualizer = useVirtualizer({
        count: calls.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 90,
        overscan: 5,

        measureElement: (element) =>
            element.getBoundingClientRect().height,

        onChange: (instance) => {
            const virtualItems = instance.getVirtualItems();

            if (!virtualItems.length) {
                return;
            }

            const lastItem = virtualItems[virtualItems.length - 1];

            // Load more when approaching the end
            if (lastItem.index >= calls.length - 3) {
                loadMore();
            }
        },
    });

    /**
     * Reset list when filters/search params change.
     */
    useEffect(() => {
        setPage(1);
        setCalls(filteredCalls.slice(0, PAGE_LIMIT));
    }, [filteredCalls, searchParams]);

    /**
     * Read saved scroll state when returning to this page.
     * Restore virtualized scroll position after the required
     */
    useEffect(() => {
        if (isLoading || filteredCalls.length === 0) {
            return;
        }

        const savedState = sessionStorage.getItem(SCROLL_STATE_KEY);

        if (!savedState) {
            return;
        }

        try {
            const state: ScrollState = JSON.parse(savedState);

            /**
             * Find the call again.
             *
             * This is safer than blindly using the old index because
             * filtering/sorting may have changed.
             */
            const currentIndex = filteredCalls.findIndex(
                (call) => call.id === state.callId
            );

            if (currentIndex === -1) {
                sessionStorage.removeItem(SCROLL_STATE_KEY);
                return;
            }

            const requiredPage =
                Math.floor(currentIndex / PAGE_LIMIT) + 1;

            const requiredItems = Math.min(
                requiredPage * PAGE_LIMIT,
                filteredCalls.length
            );

            // setCalls(filteredCalls.slice(0, requiredItems));
            // setPage(requiredPage);

            setCalls(filteredCalls.slice(0, requiredItems));
            setPage(requiredPage);

            // Tell effect 2 that restoration is required.
            setRestoreIndex(currentIndex);



        } catch {
            sessionStorage.removeItem(SCROLL_STATE_KEY);
        }
    }, [filteredCalls]);

    /**
       * Runs after calls has changed.
       *
       * The required rows are now rendered.
       * Wait for the layout to finish before restoring the scroll position.
    */
    useEffect(() => {
        if (restoreIndex === null) {
            return;
        }

        // Required row hasn't been loaded yet.
        if (calls.length <= restoreIndex) {
            return;
        }

        const savedState = sessionStorage.getItem(SCROLL_STATE_KEY);

        if (!savedState) {
            setRestoreIndex(null);
            return;
        }
        try {
            const state: ScrollState = JSON.parse(savedState);

            // rowVirtualizer.scrollToIndex(state.index, {
            //     align: 'center',
            // });

            // Then correct to the exact previous pixel position
            requestAnimationFrame(() => {
                rowVirtualizer.scrollToOffset(state.scrollTop);
            });

            setRestoreIndex(null);
            sessionStorage.removeItem(SCROLL_STATE_KEY);
        } catch {
            setRestoreIndex(null);
            sessionStorage.removeItem(SCROLL_STATE_KEY);
        }
    }, [restoreIndex, calls.length])

    /**
     * Load next page.
     */
    function loadMore() {
        if (calls.length >= filteredCalls.length) {
            return;
        }

        const newPage = page + 1;

        const skip = (newPage - 1) * PAGE_LIMIT;
        const offset = newPage * PAGE_LIMIT;

        const data = filteredCalls.slice(skip, offset);

        setCalls((prev) => [...prev, ...data]);
        setPage(newPage);
    }

    /**
     * Navigate to details while remembering which call was selected.
     */
    const handleRowClick = (callId: string, index: number) => {
        const scrollState: ScrollState = {
            callId,
            index,
            page: Math.floor(index / PAGE_LIMIT) + 1,
            scrollTop: parentRef.current?.scrollTop ?? 0,
        };

        sessionStorage.setItem(
            SCROLL_STATE_KEY,
            JSON.stringify(scrollState)
        );

        navigate(`${callId}`);
    };

    return (
        <div
            ref={parentRef}
            className="h-[calc(100vh-230px)] min-h-[400px] overflow-y-auto"
        >
            {isLoading ? (
                <CallsTableSkeletonLoader />
            ) : calls.length === 0 ? (
                <ListEmptyState />
            ) : (
                <div
                    className="relative w-full"
                    style={{
                        height: `${rowVirtualizer.getTotalSize()}px`,
                    }}
                >
                    {rowVirtualizer
                        .getVirtualItems()
                        .map((virtualRow) => {
                            const call = calls[virtualRow.index];

                            if (!call) {
                                return null;
                            }

                            return (
                                <div
                                    ref={rowVirtualizer.measureElement}
                                    key={call.id}
                                    data-index={virtualRow.index}
                                    className="absolute left-0 top-0 w-full"
                                    style={{
                                        height: `${virtualRow.size}px`,
                                        transform: `translateY(${virtualRow.start}px)`,
                                        cursor: 'pointer',
                                    }}
                                    onClick={() =>
                                        handleRowClick(
                                            call.id,
                                            virtualRow.index
                                        )
                                    }
                                >
                                    <TableListItem call={call} />
                                </div>
                            );
                        })}
                </div>
            )}
        </div>
    );
}

export default CallsTableList;