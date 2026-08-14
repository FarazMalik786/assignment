import type { CallStatus } from "@types"

type StatusPillProps = {
    status: CallStatus | string
}
function CallStatusPill({ status }: StatusPillProps) {

    const styles: Record<CallStatus | string, string> = {
        qualified: 'bg-success-light text-success',
        rejected: 'bg-danger-light text-danger',
        callback: 'bg-warning-light text-warning',
        no_answer: 'bg-warning-light text-warning',
    }

    return (
        <span
            className={`
        inline-flex items-center justify-center
        rounded-full
        px-3 py-1.5
        text-xs font-semibold
        ${styles[status]}
      `}
        >
            {status}
        </span>
    )

}

export default CallStatusPill