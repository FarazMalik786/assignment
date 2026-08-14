import type { OptionProps } from "react-select"
import Select, {
    type MultiValue,
    components,
    type ValueContainerProps,
} from "react-select"

type Props<T> = {
    data: T[]
    value: T[]
    onChange: (value: T[]) => void
    labelKey: keyof T
    valueKey: keyof T
    placeholder?: string
    className?: string
    isDisabled?: boolean
    error?: string
}

function AppMultiSelectDropdown<T>({
    data,
    value,
    onChange,
    labelKey,
    valueKey,
    placeholder = "Select...",
    className = "",
    isDisabled = false,
    error,
}: Props<T>) {
    const options = data.map((item) => ({
        label: String(item[labelKey]),
        value: String(item[valueKey]),
        item,
    }))

    const selected = options.filter((option) =>
        value.some(
            (item) =>
                String(item[valueKey]) === option.value
        )
    )

    const handleChange = (
        selected: MultiValue<(typeof options)[number]>
    ) => {
        onChange(selected.map((option) => option.item))
    }

    const styles = {
        control: (base: any, state: any) => ({
            ...base,
            minHeight: "50px",
            borderRadius: "10px",

            // Red when there is an error
            borderColor: error
                ? "var(--color-border-error)"
                : state.isFocused
                    ? "var(--color-primary)"
                    : "var(--color-border)",

            boxShadow: "none",

            "&:hover": {
                borderColor: error
                    ? "var(--color-border-error)"
                    : "var(--color-primary)",
            },
        }),

        singleValue: (base: any) => ({
            ...base,
            color: "var(--color-text-primary)",
            fontSize: "14px",
        }),

        multiValue: () => ({
            display: "none",
        }),

        placeholder: (base: any) => ({
            ...base,
            color: "var(--color-text-secondary)",
            fontSize: "14px",
        }),

        input: (base: any) => ({
            ...base,
            color: "var(--color-text-primary)",
            fontSize: "14px",
        }),

        indicatorSeparator: () => ({
            display: "none",
        }),

        option: (base: any, state: any) => ({
            ...base,
            padding: "9px 12px",
            borderRadius: "8px",
            fontSize: "14px",
            color: "var(--color-text-primary)",
            backgroundColor: state.isSelected
                ? ""
                : state.isFocused
                    ? "var(--color-background)"
                    : "var(--color-background-white)",
            cursor: "pointer",

            "&:active": {
                backgroundColor: "var(--color-background-white)",
            },
        }),
    }

    const ValueContainer = (
        props: ValueContainerProps<(typeof options)[number], true>
    ) => {
        const count = props.getValue().length
        const isOpen = props.selectProps.menuIsOpen

        return (
            <components.ValueContainer {...props}>
                {count > 0 && !isOpen ? (
                    <span className="mr-1 text-sm text-text-primary">
                        {count} selected
                    </span>
                ) : null}

                {props.children}
            </components.ValueContainer>
        )
    }

    const CustomOption = (
        props: OptionProps<(typeof options)[number], true>
    ) => {
        return (
            <components.Option {...props}>
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={props.isSelected}
                        readOnly
                        tabIndex={-1}
                        className=" h-4 w-4 appearance-none rounded border border-border bg-white checked:border-primary checked:bg-primary dark:bg-white "
                    />

                    <span>{props.label}</span>
                </div>
            </components.Option>
        )
    }

    return (
        <div className={`w-full ${className}`}>
            <Select
                isMulti
                isSearchable
                isClearable
                openMenuOnClick
                closeMenuOnSelect={false}
                options={options}
                value={selected}
                onChange={handleChange}
                placeholder={placeholder}
                isDisabled={isDisabled}
                styles={styles}
                hideSelectedOptions={false}
                components={{
                    Option: CustomOption,
                    ValueContainer,
                }}
            />

            {error && (
                <p className="mt-1.5 text-xs p-1 text-text-error">
                    {error}
                </p>
            )}
        </div>
    )
}

export default AppMultiSelectDropdown