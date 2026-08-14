import React from 'react'

function TableHeaderItem({
    children,
    className
}: {
    children: React.ReactNode
    className?: string
}) {
    return (
        <div className={`px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-text-muted ${className}`}>
            {children}
        </div>
    )
}


export default TableHeaderItem