import { useEffect, useRef, useState } from "react"
import {
    DayPicker,
    type DateRange,
} from "react-day-picker"
import { CalendarDays } from "lucide-react"
import "react-day-picker/style.css"

type AppDatePickerProps = {
    value?: DateRange | any
    onChange: (value: DateRange | undefined) => void
    placeholder?: string
    error?: string
}

function AppDatePicker({
    value,
    onChange,
    placeholder = "Select date range",
    error,
}: AppDatePickerProps) {
    const [open, setOpen] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    const label =
        value?.from && value?.to
            ? `${value.from.toLocaleDateString()} - ${value.to.toLocaleDateString()}`
            : value?.from
                ? value.from.toLocaleDateString()
                : placeholder

    const handleSelect = (range: DateRange | undefined) => {
        onChange(range)
    }

    return (
        <div
            ref={containerRef}
            className="relative w-full"
        >
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className={`
                    flex h-11 w-full
                    items-center justify-between
                    rounded-[10px]
                    border
                    bg-white
                    px-3
                    text-sm
                    outline-none
                    transition-colors
                    ${error
                        ? "border-border-error hover:border-border-error focus:border-border-error"
                        : "border-border hover:border-primary focus:border-primary"
                    }
                `}
            >
                <span
                    className={
                        value?.from
                            ? "text-text-primary"
                            : "text-text-secondary"
                    }
                >
                    {label}
                </span>

                <CalendarDays
                    className={`
                        h-4 w-4
                        ${error ? "text-text-error" : "text-text-muted"}
                    `}
                />
            </button>

            {error && (
                <p className="mt-1.5 p-1 text-xs text-text-error">
                    {error}
                </p>
            )}

            {open && (
                <div
                    className="
                        absolute left-0 top-full z-[100]
                        mt-2
                        rounded-[10px]
                        border border-border
                        bg-white
                        p-3
                        shadow-lg
                    "
                >
                    <DayPicker
                        mode="range"
                        selected={value as DateRange}
                        onSelect={handleSelect}
                    />
                </div>
            )}
        </div>
    )
}

export default AppDatePicker