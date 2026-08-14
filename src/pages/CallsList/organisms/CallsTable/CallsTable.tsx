
import CallsTableHeader from './CallsTableHeader'
import CallsTableList from './CallsTableList'


function CallsTable() {

    return (
        <div className="overflow-hidden rounded-b-lg bg-white">


            {/* header */}
            <CallsTableHeader />

            {/* list */}
            <CallsTableList />


        </div>
    )
}


export default CallsTable