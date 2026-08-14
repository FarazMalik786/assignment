
import { useSearchParams } from 'react-router-dom';
import CallsListLayout from './templates/CallsListLayout'
import CallsSummary from './templates/CallsSummary'
import { CALL_FILTER_KEYS } from '@constants/callConstants';
import type { Call } from '@types';
import { useCallsStore } from '@store/callsStore';
import { useEffect } from 'react';

function CallsList() {
  const setFilteredCalls = useCallsStore((state) => state.setFilteredCalls);
  const setCallsLoading = useCallsStore((state) => state.setCallsLoading);
  const callsList: Call[] = useCallsStore((state) => state.calls);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams) {
      syncFiltersFromSearchParams()
    }
  }, [searchParams])


  function syncFiltersFromSearchParams() {
    try {

      setCallsLoading(true);
      const agentValues = searchParams.getAll(CALL_FILTER_KEYS.AGENT);
      const outcomeValues = searchParams.getAll(CALL_FILTER_KEYS.OUTCOME);

      const minDurationParam = searchParams.get(CALL_FILTER_KEYS.MIN_DURATION);
      const maxDurationParam = searchParams.get(CALL_FILTER_KEYS.MAX_DURATION);

      const minDuration = minDurationParam
        ? Number(minDurationParam)
        : null;

      const maxDuration = maxDurationParam
        ? Number(maxDurationParam)
        : null;

      const fromDateParam = searchParams.get(CALL_FILTER_KEYS.FROM_DATE);
      const toDateParam = searchParams.get(CALL_FILTER_KEYS.TO_DATE);

      const fromDate = fromDateParam
        ? new Date(fromDateParam).getTime()
        : null;

      const toDate = toDateParam
        ? new Date(toDateParam).getTime()
        : null;

      const search = searchParams.get(CALL_FILTER_KEYS?.SEARCH) || "";



      const filteredData = callsList.filter((call) => {
        // Agent
        if (
          agentValues.length > 0 &&
          !agentValues.includes(String(call.id))
        ) {
          return false;
        }

        // Outcome
        if (
          outcomeValues.length > 0 &&
          !outcomeValues.includes(call.outcome)
        ) {
          return false;
        }

        // Minimum duration
        if (
          minDuration !== null &&
          call.duration < minDuration
        ) {
          return false;
        }

        // Maximum duration
        if (
          maxDuration !== null &&
          call.duration > maxDuration
        ) {
          return false;
        }

        // From date
        const timestamp = new Date(call.timestamp).getTime();

        if (
          fromDate !== null &&
          timestamp < fromDate
        ) {
          return false;
        }

        // To date
        if (
          toDate !== null &&
          timestamp > toDate
        ) {
          return false;
        }

        // search
        if (
          search &&
          typeof search === 'string' &&
          !call?.transcript?.toLowerCase().includes(search.toLowerCase())
        ) {
          return false;
        }

        return true;
      });

      setFilteredCalls(Array.isArray(filteredData) ? filteredData : []);
    } catch (error) {
    }finally{
      setCallsLoading(false);
    }
  }

  return (
    <div className="p-4">

      <CallsSummary />

      <CallsListLayout />


    </div>
  )
}



export default CallsList