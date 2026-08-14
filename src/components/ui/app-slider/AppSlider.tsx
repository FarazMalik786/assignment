import * as Slider from "@radix-ui/react-slider"

type AppSliderProps = {
    value: [number, number]
    onChange: (value: [number, number]) => void
    min?: number
    max?: number
    step?: number
    className?: string
    error?: string
}

function AppSlider({
    value,
    onChange,
    min = 0,
    max = 100,
    step = 1,
    className = "",
    error,
}: AppSliderProps) {
    return (
        <div className="w-full">
            <Slider.Root
                value={value}
                onValueChange={(values) => {
                    if (values.length === 2) {
                        onChange([values[0], values[1]])
                    }
                }}
                min={min}
                max={max}
                step={step}
                className={`
                    relative flex h-6 w-full items-center
                    touch-none select-none
                    ${className}
                `}
            >
                <Slider.Track className="relative h-1 w-full rounded-full bg-border">
                    <Slider.Range className="absolute h-full rounded-full bg-primary" />
                </Slider.Track>

                <Slider.Thumb
                    aria-label="Minimum value"
                    className="
                        block h-5 w-5
                        rounded-full
                        border-2 border-white
                        bg-primary
                        shadow
                        outline-none
                        touch-none
                        focus-visible:ring-2
                        focus-visible:ring-primary
                    "
                />

                <Slider.Thumb
                    aria-label="Maximum value"
                    className="
                        block h-5 w-5
                        rounded-full
                        border-2 border-white
                        bg-primary
                        shadow
                        outline-none
                        touch-none
                        focus-visible:ring-2
                        focus-visible:ring-primary
                    "
                />
            </Slider.Root>

            {error && (
                <p className="mt-1.5 text-xs text-text-error">
                    {error}
                </p>
            )}
        </div>
    )
}

export default AppSlider