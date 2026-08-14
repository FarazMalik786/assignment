import type { TranscriptLine } from "@types"


function parseTranscript(transcript: string): TranscriptLine[] {
    return transcript
        .split('\n')
        .filter(Boolean)
        .map((line) => {
            const separatorIndex = line.indexOf(': ')

            if (separatorIndex === -1) {
                return {
                    speaker: '',
                    message: line,
                }
            }

            return {
                speaker: line.slice(0, separatorIndex),
                message: line.slice(separatorIndex + 2),
            }
        })
}

export {
    parseTranscript
}