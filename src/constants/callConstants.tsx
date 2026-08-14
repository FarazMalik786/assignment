enum CALL_OUTCOME_STATUS {
    Qualified = "qualified",
    Rejected = "rejected",
    Callback = "callback",
    NoAnswer = "no_answer",
}

enum CALL_FILTER_KEYS {
    SEARCH = "search",
    AGENT = "agentId",
    OUTCOME = "outcome",
    MIN_DURATION = "minDuration",
    MAX_DURATION = "maxDuration",
    FROM_DATE = "fromDate",
    TO_DATE = "toDate",
}

export {
    CALL_OUTCOME_STATUS,
    CALL_FILTER_KEYS
}