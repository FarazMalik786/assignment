import { formatDuration, getInitials } from '@utils/formatters'
import TableAgentCell from '../atoms/TableAgentCell'
import SentimentBadge from '../atoms/SentimentBadge'
import CallStatusPill from '../atoms/CallStatusPill'
import type { Call } from '@types'
import { ChevronRight } from 'lucide-react'

function TableListItem({ call }: { call: Call }) {
    return (
        <div className="h-full">
            {/*   Desktop Row */}

            <div
                className="
                      hidden
                      h-full
                      grid-cols-[30%_10%_10%_15%_30%_5%]
                      border-b border-border-light
                      transition-colors
                      hover:bg-background
                      md:grid
                    "
            >
                {/* Agent */}
                <div className="flex min-w-0 items-center px-4">
                    <TableAgentCell call={call} />
                </div>

                {/* ID */}
                <div className="flex items-center px-4 text-sm text-text-secondary">
                    <span className="truncate">{call.id}</span>
                </div>

                {/* Sentiment */}
                <div className="flex items-center px-4">
                    <SentimentBadge sentiment={call.sentiment} />
                </div>

                {/* Outcome */}
                <div className="flex items-center px-4">
                    <CallStatusPill status={call.outcome} />
                </div>

                {/* Transcript */}
                <div
                    className="
                        flex
                        min-w-0
                        items-center
                        px-4
                        text-sm
                        text-text-primary
                      "
                    title={call.transcript}
                >
                    <span className="truncate">
                        {call.transcript || '-'}
                    </span>
                </div>

                {/* Action */}
                <div className="flex items-center justify-end pr-3">
                    <ChevronRight size={18} strokeWidth={2} />
                </div>
            </div>

            {/* Mobile Card */}

            <div
                className="
                      flex
                      h-full
                      items-center
                      border-b
                      border-border-light
                      bg-white
                      px-4
                      py-2
                      transition-colors
                      hover:bg-background
                      md:hidden
                    "
            >
                <div
                    className="
                        flex
                        min-w-0
                        flex-1
                        items-top
                        gap-3
                      "
                >
                    {/* Avatar */}
                    <div
                        className="
                          flex
                          h-10
                          w-10
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          bg-primary
                          text-xs
                          font-semibold
                          uppercase
                          text-white
                        "
                    >
                        {getInitials(call.agent)}
                    </div>

                    {/* Main content */}
                    <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-3">
                            <p className="truncate text-sm font-semibold text-text-primary">
                                {call.agent || '-'}
                            </p>

                            <CallStatusPill status={call.outcome} />
                        </div>

                        <div className="mt-1 flex min-w-0 items-center gap-2">
                            <span className="shrink-0 text-xs text-text-muted">
                                {formatDuration(call.duration)}
                            </span>

                            <span className="text-text-disabled">•</span>

                            <span className="shrink-0 text-xs text-text-muted">
                                {call.sentiment ?? '-'}
                            </span>

                            <span className="text-text-disabled">•</span>

                            <span className="truncate text-xs text-text-secondary">
                                {call.id}
                            </span>
                        </div>


                        <p
                            className="mt-1 truncate text-[11px] text-text-muted"
                        // title={call.transcript}
                        >
                            {call.transcript || '-'}
                        </p>
                    </div>

                    {/* Action */}
                    <ChevronRight size={18} strokeWidth={2} className='self-center' />

                </div>
            </div>

        </div>
    )
}

export default TableListItem