import { useParams } from "react-router-dom"
import CallOverview from "../organisms/CallOverview"
import Header from "../organisms/Header"
import TranscriptDetails from "../organisms/TranscriptDetails"
import callsData from '@data/calls.json'
import type { Call } from '@types'
import CallDetailsEmptyState from "../organisms/CallDetailsEmptyState"

const calls: Call[] = callsData as Call[]

function CallDetailsLayout() {
    const { callId } = useParams<{ callId: string }>()

    const callDetails = calls.find((item) => item?.id === callId);

    if (!callDetails) {
        return (
            <div className="mx-auto w-full px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
                {/* Header */}
                <Header />

                <CallDetailsEmptyState />

            </div>
        )
    }

    return (
        <div
            className="mx-auto w-full px-4 py-5 sm:px-6 sm:py-8 lg:px-8"
        >
            {/* Header */}
            <Header />

            {/* overview */}
            <CallOverview callDetails={callDetails as Call} />

            {/* Transcript */}
            <TranscriptDetails transcript={callDetails?.transcript as string} />

        </div>
    )
}

export default CallDetailsLayout