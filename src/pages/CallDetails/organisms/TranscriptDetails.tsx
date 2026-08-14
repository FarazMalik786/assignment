import { parseTranscript } from '@utils/transcript'

function TranscriptDetails({ transcript = '' }: { transcript: string }) {

    const transcriptLines = parseTranscript(transcript);

    return (
        <section className="mt-5 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm sm:mt-6">
            <div className="border-b border-slate-200 px-4 py-4 sm:px-6">
                <h2 className="text-base font-semibold text-slate-900 sm:text-lg">
                    Call Transcript
                </h2>
                <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                    Conversation between the agent and caller
                </p>
            </div>

            <div className="space-y-5 p-4 sm:space-y-6 sm:p-6">
                {transcriptLines.map((line, index) => {
                    const isAgent = line.speaker.toLowerCase() === 'agent'

                    return (
                        <div
                            key={index}
                            className={`flex ${isAgent ? 'justify-start' : 'justify-end'
                                }`}
                        >
                            <div
                                className={`w-full sm:max-w-[75%] ${isAgent ? 'sm:mr-auto' : 'sm:ml-auto'
                                    }`}
                            >
                                <div
                                    className={`mb-1.5 flex items-center gap-2 ${!isAgent ? 'justify-end' : ''
                                        }`}
                                >
                                    <span className="text-xs font-semibold text-slate-700">
                                        {line?.speaker}
                                    </span>
                                </div>

                                <div
                                    className={`rounded-2xl px-4 py-3 text-sm leading-6 ${isAgent
                                        ? 'rounded-tl-sm bg-slate-100 text-slate-700'
                                        : 'rounded-tr-sm bg-background-navy text-white'
                                        }`}
                                >
                                    {line?.message}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default TranscriptDetails