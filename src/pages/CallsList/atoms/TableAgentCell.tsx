import type { Call } from '@types'
import { formatDuration, getInitials } from '@utils/formatters'

function TableAgentCell({ call }: { call: Call }) {
  return (
        <div className="flex min-w-0 items-center gap-3">
            <div
                className="
          flex
          h-[38px]
          w-[38px]
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

            <div className="flex min-w-0 flex-col gap-0.5 overflow-hidden">
                <span className="truncate text-sm font-semibold text-text-primary">
                    {call.agent || '-'}
                </span>

                <span className="truncate text-xs text-text-muted">
                    {formatDuration(call.duration)}
                </span>
            </div>
        </div>
    )
}

export default TableAgentCell