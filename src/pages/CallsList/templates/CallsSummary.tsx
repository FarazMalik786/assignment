
import OutcomeDetails from "../organisms/CallSummary/OutcomeDetails";
import SummeryItems from "../organisms/CallSummary/SummeryItems";

function CallsSummary() {


    return (
        <div className="mb-4 w-full">
            <div
                className="
                    grid
                    grid-cols-1
                    gap-3
                    sm:grid-cols-2
                    lg:grid-cols-[1fr_1fr_2fr]
                "
            >
                {/* Total / Average */}
                <SummeryItems />

                {/* Outcome Breakdown */}
                <OutcomeDetails />
            </div>
        </div>
    );
}

export default CallsSummary;