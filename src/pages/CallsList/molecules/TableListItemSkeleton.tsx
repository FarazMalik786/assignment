function TableListItemSkeleton() {
    return (
        <div className="w-full animate-pulse">
            {/* Desktop */}
            <div
                className="
                    hidden
                    h-[96px]
                    grid-cols-[30%_10%_10%_15%_30%_5%]
                    border-b
                    border-border-light
                    md:grid
                "
            >
                {/* Agent */}
                <div className="flex min-w-0 items-center gap-3 px-4">
                    <div className="h-11 w-11 shrink-0 rounded-full bg-gray-200" />

                    <div className="flex min-w-0 flex-1 flex-col gap-2">
                        <div className="h-4 w-32 rounded bg-gray-200" />
                        <div className="h-3 w-20 rounded bg-gray-200" />
                    </div>
                </div>

                {/* ID */}
                <div className="flex items-center px-4">
                    <div className="h-4 w-16 rounded bg-gray-200" />
                </div>

                {/* Sentiment */}
                <div className="flex items-center px-4">
                    <div className="h-6 w-20 rounded-full bg-gray-200" />
                </div>

                {/* Outcome */}
                <div className="flex items-center px-4">
                    <div className="h-6 w-20 rounded-full bg-gray-200" />
                </div>

                {/* Transcript */}
                <div className="flex min-w-0 items-center px-4">
                    <div className="h-4 w-[80%] rounded bg-gray-200" />
                </div>

                {/* Arrow */}
                <div className="flex items-center justify-end pr-3">
                    <div className="h-5 w-5 rounded bg-gray-200" />
                </div>
            </div>

            {/* Mobile */}
            <div
                className="
                    flex
                    min-h-[80px]
                    items-center
                    border-b
                    border-border-light
                    bg-white
                    px-4
                    py-2
                    md:hidden
                "
            >
                <div className="flex min-w-0 flex-1 items-center gap-3">
                    {/* Avatar */}
                    <div className="h-10 w-10 shrink-0 rounded-full bg-gray-200" />

                    {/* Content */}
                    <div className="min-w-0 flex-1">
                        {/* Agent + status */}
                        <div className="flex items-center justify-between gap-3">
                            <div className="h-4 w-28 rounded bg-gray-200" />

                            <div className="h-6 w-20 shrink-0 rounded-full bg-gray-200" />
                        </div>

                        {/* Metadata */}
                        <div className="mt-2 flex items-center gap-2">
                            <div className="h-3 w-10 rounded bg-gray-200" />
                            <div className="h-3 w-1 rounded bg-gray-200" />
                            <div className="h-3 w-14 rounded bg-gray-200" />
                            <div className="h-3 w-1 rounded bg-gray-200" />
                            <div className="h-3 w-16 rounded bg-gray-200" />
                        </div>

                        {/* Transcript */}
                        <div className="mt-2 h-3 w-[85%] rounded bg-gray-200" />
                    </div>

                    {/* Arrow */}
                    <div className="h-5 w-5 shrink-0 rounded bg-gray-200" />
                </div>
            </div>
        </div>
    );
}

export default TableListItemSkeleton;