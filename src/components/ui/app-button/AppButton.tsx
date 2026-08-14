import type {
    ButtonHTMLAttributes,
    ReactNode,
} from 'react'

type AppButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    leftIcon?: ReactNode
    rightIcon?: ReactNode
}

function AppButton({
    children,
    leftIcon,
    rightIcon,
    onClick,
    style,
    className = '',
    type = 'button',
    ...props
}: AppButtonProps) {
    return (
        <button
            type={type}
            {...props}
            onClick={onClick}
            style={style}
            className={`
                inline-flex
                items-center
                justify-center
                gap-2
                transition-all
                duration-200
                active:scale-[0.98]
                disabled:cursor-not-allowed
                disabled:opacity-50
                ${className}
            `}
        >
            {leftIcon}

            {children}

            {rightIcon}
        </button>
    )
}

export default AppButton