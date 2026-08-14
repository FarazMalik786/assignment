
function CallSumeryItem({ item }: any) {
    const Icon = item.icon;
    return (
        <div
            key={item.label}
            className="
                                flex
                                min-h-[88px]
                                items-center
                                gap-4
                                rounded-xl
                                border
                                border-border-light
                                bg-white
                                px-4
                                py-3
                            "
        >
            <div
                className={`
                                    flex h-11 w-11 shrink-0
                                    items-center justify-center
                                    rounded-xl
                                    ${item.iconClass}
                                `}
            >
                <Icon
                    className="h-5 w-5"
                    strokeWidth={1.8}
                />
            </div>

            <div className="min-w-0">
                <p className="text-xs font-medium text-text-muted">
                    {item?.label}
                </p>

                <p className="mt-1 text-xl font-semibold text-text-primary">
                    {item?.value}
                </p>
            </div>
        </div>
    )
}

export default CallSumeryItem