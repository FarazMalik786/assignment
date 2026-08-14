import {
    CheckCircle2,
    XCircle,
    PhoneCall,
    PhoneOff,
    User,
    Clock3,
    CalendarDays,
} from 'lucide-react'
import type { Call, CallStatus } from '@types'
import InfoCard from '../molecules/InfoCard'
import { formatDate, formatDuration } from '@utils/formatters'


type CallOverviewProps = {
    callDetails: Call
}

const outcomeConfig: Record<
    CallStatus | string,
    {
        label: string
        className: string
        icon: React.ReactNode
    }
> = {
    qualified: {
        label: 'Qualified',
        className:
            'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200',
        icon: <CheckCircle2 className="h-4 w-4" />,
    },
    rejected: {
        label: 'Rejected',
        className:
            'bg-red-50 text-red-700 ring-1 ring-inset ring-red-200',
        icon: <XCircle className="h-4 w-4" />,
    },
    callback: {
        label: 'Callback',
        className:
            'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-200',
        icon: <PhoneCall className="h-4 w-4" />,
    },
    no_answer: {
        label: 'No Answer',
        className:
            'bg-slate-100 text-slate-600 ring-1 ring-inset ring-slate-200',
        icon: <PhoneOff className="h-4 w-4" />,
    },
}

function CallOverview({ callDetails }: CallOverviewProps) {
    const outcome = outcomeConfig[callDetails?.outcome]


    return (
        <div className="space-y-5">
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                {/* Top section */}
                <div className="border-b border-slate-100 p-5 sm:p-6">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0">
                            <div className="mb-2 flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                                    <PhoneCall className="h-4 w-4" />
                                </div>

                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                    Call details
                                </p>
                            </div>

                            <h1 className="break-all text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                                {callDetails?.agent || ""}
                            </h1>
                        </div>

                        {/* Status */}
                        <span
                            className={`
                            inline-flex w-fit shrink-0 items-center gap-1.5
                            rounded-full px-3 py-1.5
                            text-xs font-semibold
                            ${outcome.className}
                        `}
                        >
                            {outcome.icon}
                            {outcome.label}
                        </span>
                    </div>
                </div>


            </section>

            {/* Overview cards */}
            <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <InfoCard
                    icon={<User className="h-5 w-5" />}
                    label="Agent Id"
                    value={callDetails?.id || '-'}
                />

                <InfoCard
                    icon={<Clock3 className="h-5 w-5" />}
                    label="Duration"
                    value={formatDuration(callDetails?.duration)}
                />

                <InfoCard
                    icon={<CalendarDays className="h-5 w-5" />}
                    label="Date"
                    value={formatDate(callDetails?.timestamp)}
                />

                <InfoCard
                    icon={<PhoneCall className="h-5 w-5" />}
                    label="Sentiment score"
                    value={callDetails?.sentiment}
                />
            </section>
        </div>
    )
}



export default CallOverview