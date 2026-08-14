import CallsTable from '../organisms/CallsTable/CallsTable'
import Filters from '../organisms/Filters/Filters'

function CallsListLayout() {
  return (
      <section className='bg-background-white rounded-lg border border-border'>

        <Filters />

        <CallsTable />

      </section>
  )
}

export default CallsListLayout