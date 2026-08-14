
function SentimentBadge({
    sentiment,
}: {
    sentiment: number | null
}) {
    return (
        <span
            className="
        inline-flex
        min-w-[42px]
        items-center
        justify-center
        rounded-full
        bg-primary-light
        px-2.5
        py-1.5
        text-xs
        font-semibold
        text-primary
      "
        >
            {sentiment ?? '-'}
        </span>
    )
}

export default SentimentBadge