type CallStatus = 'qualified' | 'rejected' | 'callback' | 'no_answer';

type Call = {
    id: string
    agent: string
    duration: number
    timestamp: string
    outcome: CallStatus | string
    sentiment: number
    transcript: string
}

type TranscriptLine = {
    speaker: string
    message: string
}

export type {
    Call,
    CallStatus,
    TranscriptLine
}