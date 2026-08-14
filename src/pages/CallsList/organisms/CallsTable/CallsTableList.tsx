import { useAppNavigation } from '@hooks/useAppNavigation';
import { useVirtualizer } from '@tanstack/react-virtual'
import type { Call } from '@types';
import { useEffect, useRef, useState } from 'react'
import TableListItem from '@pages/CallsList/molecules/TableListItem';
import { useSearchParams } from 'react-router-dom';
import ListEmptyState from './ListEmptyState';
import CallsTableSkeletonLoader from './CallsTableSkeletonLoader';
import { useCallsStore } from '@store/callsStore';


const PAGE_Limit = 20
function CallsTableList() {
    const isLoading = useCallsStore((state) => state.isCallsLoading);
    const filteredCalls: Call[] = useCallsStore((state) => state.filteredCalls);
    const { navigate } = useAppNavigation();
    const [searchParams] = useSearchParams();
    const parentRef = useRef<HTMLDivElement>(null);
    const [page, setPage] = useState(1);
    const [calls, setCalls] = useState<Call[]>(filteredCalls?.slice(0, PAGE_Limit));



    useEffect(() => {
        setPage(1);
        setCalls(filteredCalls.slice(0, PAGE_Limit));
    }, [filteredCalls?.length || searchParams]);

  

    function loadMore() {
        if (calls.length >= filteredCalls.length) {
            return;
        }
        const newPage = page + 1;
        const skip = (newPage - 1) * PAGE_Limit;
        const offset = newPage * PAGE_Limit;
        const data = filteredCalls?.slice(skip, offset);
        setCalls(ext => {
            return [...ext, ...data]
        });
        setPage(newPage)
    }

    const rowVirtualizer = useVirtualizer({
        count: calls.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 90,
        overscan: 1,
        measureElement: (element) => element.getBoundingClientRect().height,
        onChange: (instance) => {
            const virtualItems = instance.getVirtualItems();

            if (!virtualItems.length) {
                return;
            }

            const lastItem = virtualItems[virtualItems.length - 1];

            // Start loading when user reached on end
            if (lastItem?.index >= calls?.length - 3) {
                loadMore();
            }
        },
    });

    const handleRowClick = (callId: string) => {
        navigate(`${callId}`)
    }

    return (
        <div
            ref={parentRef}
            className=" h-[calc(100vh-230px)] min-h-[400px] overflow-y-auto"
        >
            {isLoading ?
                <CallsTableSkeletonLoader />
                :
                calls.length === 0 ? (
                    <ListEmptyState />
                ) : (
                    <div
                        className="relative w-full"
                        style={{
                            height: `${rowVirtualizer.getTotalSize()}px`,
                        }}
                    >
                        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                            const call = calls[virtualRow.index]

                            return (
                                <div
                                    ref={rowVirtualizer.measureElement}
                                    key={call.id}
                                    data-index={virtualRow.index}
                                    className="absolute left-0 top-0 w-full"
                                    style={{
                                        height: `${virtualRow.size}px`,
                                        transform: `translateY(${virtualRow.start}px)`,
                                        cursor: 'pointer'

                                    }}
                                    onClick={() => handleRowClick(call?.id)}
                                >
                                    <TableListItem call={call} />
                                </div>
                            )
                        })}
                    </div>
                )}
        </div>
    )
}

export default CallsTableList