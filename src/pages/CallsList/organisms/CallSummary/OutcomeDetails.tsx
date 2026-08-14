import { CheckCircle2 } from 'lucide-react';
import type { Call } from '@types';
import { useCallsStore } from '@store/callsStore';

function OutcomeDetails() {
    const calls: Call[] = useCallsStore((state) => state.filteredCalls);

    const totalCalls = calls.length;

    const outcomeCounts = calls.reduce<Record<string, number>>(
        (acc, call) => {
            const outcome = call.outcome || "Unknown";

            acc[outcome] = (acc[outcome] || 0) + 1;

            return acc;
        },
        {}
    );

  
    return (
        <div
            className="
                        min-h-[88px]
                        rounded-xl
                        border
                        border-border-light
                        bg-white
                        px-4
                        py-3
                    "
        >
            <div className="mb-3 flex items-center gap-2">
                <div
                    className="
                                flex h-8 w-8
                                items-center justify-center
                                rounded-lg
                                bg-emerald-50
                                text-emerald-600
                            "
                >
                    <CheckCircle2
                        className="h-4 w-4"
                        strokeWidth={1.8}
                    />
                </div>

                <div>
                    <p className="text-xs font-medium text-text-muted">
                        Outcome Breakdown
                    </p>

                    <p className="text-sm font-semibold text-text-primary">
                        {totalCalls} calls
                    </p>
                </div>
            </div>

            <div className="flex flex-wrap gap-2">
                {Object.entries(outcomeCounts).length > 0 ? (
                    Object.entries(outcomeCounts).map(
                        ([outcome, count]) => {
                          
                            return (
                                <div
                                    key={outcome}
                                    className="
                                                flex
                                                items-center
                                                gap-1.5
                                                rounded-lg
                                                bg-background
                                                px-2.5
                                                py-1.5
                                            "
                                >

                                    <span className="text-xs text-text-secondary">
                                        {outcome}
                                    </span>

                                    <span className="text-xs font-semibold text-text-primary">
                                        {count}
                                    </span>
                                </div>
                            );
                        }
                    )
                ) : (
                    <span className="text-xs text-text-muted">
                        No outcomes available
                    </span>
                )}
            </div>
        </div>
    )
}

export default OutcomeDetails