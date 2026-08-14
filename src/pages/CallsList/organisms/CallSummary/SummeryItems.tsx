import CallSumeryItem from "@pages/CallsList/molecules/CallSumeryItem";
import { useCallsStore } from "@store/callsStore";
import type { Call } from "@types";
import { formatDuration } from "@utils/formatters";
import { Clock3, PhoneCall } from "lucide-react";

function SummeryItems() {
    const calls: Call[] = useCallsStore((state) => state.filteredCalls);

    const totalCalls = calls.length;

    const totalDuration = calls.reduce(
        (total, call) => total + (call.duration || 0),
        0
    );

    const averageDuration =
        totalCalls > 0 ? totalDuration / totalCalls : 0;


    const summaryItems = [
        {
            label: "Total Calls",
            value: totalCalls,
            icon: PhoneCall,
            iconClass: "bg-blue-50 text-blue-600",
        },
        {
            label: "Avg. Duration",
            value: formatDuration(Math.round(averageDuration)),
            icon: Clock3,
            iconClass: "bg-violet-50 text-violet-600",
        },
    ];
    return (
        <>
            {summaryItems.map((item) => {

                return (
                    <CallSumeryItem item={item} />
                );
            })}
        </>
    )
}

export default SummeryItems