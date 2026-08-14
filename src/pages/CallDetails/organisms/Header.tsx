import { useAppNavigation } from '@hooks/useAppNavigation'
import { ArrowLeft } from 'lucide-react'

function Header() {
    const { navigate } = useAppNavigation()

    return (
        <div
            onClick={() => navigate(-1)}
            className="
                group mb-5 inline-flex cursor-pointer items-center gap-2
                rounded-lg px-3 py-2
                text-sm font-medium text-slate-500
                transition-all duration-200 ease-out
                hover:-translate-x-0.5
                hover:bg-slate-100
                hover:text-slate-900
                active:scale-95
                active:bg-slate-200
                sm:mb-7
            "
        >
            <ArrowLeft
                className="
                    h-4 w-4
                    transition-all duration-200
                    group-hover:-translate-x-1
                "
            />

            <span>Back to calls</span>
        </div>
    )
}

export default Header