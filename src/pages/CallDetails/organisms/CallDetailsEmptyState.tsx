import { PhoneOff } from "lucide-react";

function CallDetailsEmptyState() {
    return (
        <div className="flex min-h-[60vh] w-full items-center justify-center px-4">
            <div className="flex max-w-md flex-col items-center text-center">
                {/* Icon */}
                <div
                    className="
                        mb-5
                        flex h-16 w-16
                        items-center justify-center
                        rounded-2xl
                        bg-primary-light
                        text-primary
                    "
                >
                    <PhoneOff
                        className="h-7 w-7"
                        strokeWidth={1.8}
                    />
                </div>

                {/* Title */}
                <h2 className="text-xl font-semibold text-text-primary">
                    Call not found
                </h2>

                {/* Description */}
                <p className="mt-2 max-w-sm text-sm leading-6 text-text-muted">
                    We couldn't find the call you're looking for.
                    The call may have been removed or the link may
                    be invalid.
                </p>

              
            </div>
        </div>
    );
}

export default CallDetailsEmptyState;