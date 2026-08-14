import TableListItemSkeleton from '@pages/CallsList/molecules/TableListItemSkeleton'

function CallsTableSkeletonLoader() {
    return (
        <div>
            {
                Array.from({ length: 10 })?.map((_, i) => {
                    return <TableListItemSkeleton key={i} />
                })
            }
        </div>
    )
}

export default CallsTableSkeletonLoader