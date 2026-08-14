import React from 'react'

type InfoCardProps = {
    icon: React.ReactNode
    label: string
    value: string | number
}

function InfoCard({ icon, label, value }: InfoCardProps) {
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    {icon}
                </div>

                <div className="min-w-0">
                    <p className="text-xs font-medium text-slate-500">{label}</p>
                    <p className="mt-1 truncate text-sm font-semibold text-slate-900">
                        {value}
                    </p>
                </div>
            </div>
        </div>
    )
}
export default InfoCard