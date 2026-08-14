import type { InputHTMLAttributes, ReactNode } from "react"

type AppInputProps = InputHTMLAttributes<HTMLInputElement> &
{
    leftIcon?: ReactNode
    rightIcon?: ReactNode
    inputWidth?: number | string
}

function AppTextInput({
    leftIcon,
    rightIcon,
    className = '',
    inputWidth,
    ...props
}: AppInputProps) {

    return (
        <div className={`relative ${inputWidth ?? 'w-full'}`}>
            {leftIcon && (
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    {leftIcon}
                </div>
            )}

            <input
                {...props}
                className={`
                    w-full
                    outline-none
                    ${className}
                    ${leftIcon ? 'pl-10' : ''}
                    ${rightIcon ? 'pr-10' : ''}
                `}
            />

            {rightIcon && (
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    {rightIcon}
                </div>
            )}
        </div>
    )
}

export default AppTextInput