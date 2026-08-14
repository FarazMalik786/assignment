import { CALL_FILTER_KEYS } from "@constants/callConstants";

function getFiltersFromUrl(search = window.location.search) {
    const params = new URLSearchParams(search);

    return {
        agents: params.getAll(CALL_FILTER_KEYS?.AGENT),
        outcomes: params.getAll(CALL_FILTER_KEYS?.OUTCOME),
        minDuration: params.get(CALL_FILTER_KEYS?.MIN_DURATION)
            ? Number(params.get(CALL_FILTER_KEYS?.MIN_DURATION))
            : null,
        maxDuration: params.get(CALL_FILTER_KEYS?.MAX_DURATION)
            ? Number(params.get(CALL_FILTER_KEYS?.MAX_DURATION))
            : null,
        fromDate: params.get(CALL_FILTER_KEYS?.FROM_DATE) || null,
        toDate: params.get(CALL_FILTER_KEYS?.TO_DATE) || null,
    };
}

function getFilterBtnCount() {
    const filters = getFiltersFromUrl();
    let count = 0;

    if (filters?.agents?.length > 0) count++;
    if (filters?.outcomes?.length > 0) count++;
    if (filters?.minDuration !== null || filters?.maxDuration !== null) count++;
    if (filters.fromDate !== null || filters.toDate !== null) count++;

    return count;
}


export {
    getFiltersFromUrl,
    getFilterBtnCount
}