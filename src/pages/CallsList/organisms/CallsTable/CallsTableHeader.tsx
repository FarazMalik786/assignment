// Table Header (appears only in Desktop view)

import TableHeaderItem from "@pages/CallsList/molecules/TableHeaderItem"

function CallsTableHeader() {
    return (
        <div
            className="
          hidden
          grid-cols-[30%_10%_10%_15%_30%_5%]
          border-b border-border
          bg-background
          md:grid
        "
        >
            <TableHeaderItem>Agent</TableHeaderItem>
            <TableHeaderItem className="px-6">ID</TableHeaderItem>
            <TableHeaderItem>Sentiment</TableHeaderItem>
            <TableHeaderItem>Outcome</TableHeaderItem>
            <TableHeaderItem>Transcript</TableHeaderItem>
            <div />
        </div>
    )
}

export default CallsTableHeader