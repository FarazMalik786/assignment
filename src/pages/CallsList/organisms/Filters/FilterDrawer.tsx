import AppButton from "@appComponents/app-button/AppButton"
import AppMultiSelectDropdown from "@appComponents/app-dropdown/AppMultiSelectDropdown"
import type { Call } from "@types"
import { X } from "lucide-react"
import callsData from '@data/calls.json'
import { CALL_FILTER_KEYS, CALL_OUTCOME_STATUS } from "@constants/callConstants"
import { useEffect } from "react"
import AppSlider from "@appComponents/app-slider/AppSlider"
import AppDatePicker from "@appComponents/app-date-time-picker/AppDatePicker"
import { useSearchParams } from "react-router-dom"
import { useFormik } from 'formik'
import { filterValidationSchema } from "@validation/validationSchema/filtersSchema"

type FilterDrawerProps = {
    open: boolean
    onClose: () => void
}

type FilterFormValues = {
    agents: Call[];
    outcome: any[];
    minDuration: number;
    maxDuration: number;
    fromDate: Date | null;
    toDate: Date | null;
};

const allAgents: Call[] = callsData as Call[];
const callOutcome = Object.values(CALL_OUTCOME_STATUS)?.map((e, i) => { return { id: i, value: e?.replaceAll('_', ' ') } })

function FilterDrawer({
    open,
    onClose,
}: FilterDrawerProps) {
    const [searchParams, setSearchParams] = useSearchParams();

    const formik = useFormik<FilterFormValues>({
        initialValues: {
            agents: [],
            outcome: [],
            minDuration: 0,
            maxDuration: 0,
            fromDate: null,
            toDate: null
        },
        validationSchema: filterValidationSchema,
        onSubmit: (values) => {
            applyFilters(values)
        },
    });

    const { errors, setFieldValue, values, setValues } = formik


    useEffect(() => {
        syncFiltersFromSearchParams()
    }, [searchParams]);

    function syncFiltersFromSearchParams() {
        const agentValues = searchParams.getAll(CALL_FILTER_KEYS?.AGENT)
        const outcomeValues = searchParams.getAll(CALL_FILTER_KEYS?.OUTCOME)

        const minDuration = Number(searchParams.get(CALL_FILTER_KEYS?.MIN_DURATION) || 0)
        const maxDuration = Number(searchParams.get(CALL_FILTER_KEYS?.MAX_DURATION) || 0)

        const fromDateParam = searchParams.get(CALL_FILTER_KEYS?.FROM_DATE)
        const toDateParam = searchParams.get(CALL_FILTER_KEYS?.TO_DATE)

        const selectedAgents = allAgents.filter((agent) =>
            agentValues.includes(String(agent?.id))
        )

        const selectedOutcomes = callOutcome.filter((outcome) =>
            outcomeValues.includes(String(outcome?.value))
        )

        setValues({
            agents: selectedAgents,
            outcome: selectedOutcomes,
            minDuration,
            maxDuration,
            fromDate: fromDateParam
                ? new Date(fromDateParam)
                : null,
            toDate: toDateParam
                ? new Date(toDateParam)
                : null,
        })
    }


    function onSelectAgent(selected: Call[]) {
        setFieldValue("agents", selected);
    }

    function onSelectOutcome(selected: any[]) {
        setFieldValue("outcome", selected);
    }

    function onDurationChange(arr: [number, number]) {
        setFieldValue("minDuration", arr[0]);
        setFieldValue("maxDuration", arr[1]);
    }
    function setDateRange(dateRange: any) {
        setFieldValue("fromDate", dateRange?.from);
        setFieldValue("toDate", dateRange?.to);
    }

    function applyFilters(filters: any) {
        const params = new URLSearchParams();
        params.delete(CALL_FILTER_KEYS?.AGENT);
        params.delete(CALL_FILTER_KEYS?.OUTCOME);

        if (filters.agents?.length > 0) {
            filters.agents.forEach((value: any) => {
                params.append(CALL_FILTER_KEYS?.AGENT, value?.id);
            });
        }

        if (filters.outcome?.length > 0) {
            filters.outcome.forEach((value: any) => {
                params.append(CALL_FILTER_KEYS?.OUTCOME, value?.value);
            });
        }

        if (typeof filters.minDuration == "number" && filters?.minDuration > 0) {
            params.set(CALL_FILTER_KEYS?.MIN_DURATION, filters.minDuration);
        }

        if (typeof filters.maxDuration == "number" && filters?.maxDuration > 0) {
            params.set(CALL_FILTER_KEYS?.MAX_DURATION, filters.maxDuration);
        }

        if (Boolean(filters.fromDate)) {
            params.set(CALL_FILTER_KEYS?.FROM_DATE, filters.fromDate);
        }

        if (Boolean(filters.toDate)) {
            params.set(CALL_FILTER_KEYS?.TO_DATE, filters.toDate);
        }

        setSearchParams(params);
        closeHandler();
    }

    function resetFilters() {
        setValues({
            agents: [],
            outcome: [],
            minDuration: 0,
            maxDuration: 0,
            fromDate: null,
            toDate: null
        })
        setSearchParams({});
    }

    function closeHandler() {
        onClose();
        syncFiltersFromSearchParams();
    }


    return (
        <>
            {/* Overlay */}
            <div
                className={`
        fixed inset-0 z-40
        bg-slate-900/45
        backdrop-blur-[2px]
        transition-opacity duration-300
        ${open ? "opacity-100" : "pointer-events-none opacity-0"}
    `}
                onClick={closeHandler}
            />

            {/* Panel */}
            <aside
                className={`
                    fixed right-0 top-0 z-50
                    flex h-full
                    w-[360px] max-w-[90vw]
                    flex-col
                    bg-white
                    shadow-[-10px_0_40px_rgba(15,23,42,0.15)]
                    transition-transform duration-300 ease-in-out
                    ${open
                        ? "translate-x-0"
                        : "translate-x-full"
                    }
                `}
            >
                {/* Header */}
                <header
                    className="
                        flex items-center justify-between
                        border-b border-border-light
                        px-5 py-[18px]
                    "
                >
                    <h3 className="text-lg font-bold text-text-primary">
                        Filters
                    </h3>

                    <AppButton
                        type="button"
                        onClick={closeHandler}
                        style={{ cursor: 'pointer' }}
                        aria-label="Close filters"
                        className="
                            flex h-[34px] w-[34px]
                            items-center justify-center
                            rounded-lg
                            border border-border
                            bg-white
                            text-text-muted
                            transition-colors
                            hover:bg-background
                            hover:text-text-primary
                        "
                    >
                        <X className="h-4 w-4" />
                    </AppButton>
                </header>

                {/* Body */}
                <main className="flex flex-1 flex-col gap-[18px] overflow-y-auto p-5">

                    <section className="flex flex-col gap-2">
                        <label className="text-[13px] font-semibold text-text-secondary">
                            Agents
                        </label>

                        <AppMultiSelectDropdown
                            data={allAgents}
                            value={values?.agents}
                            onChange={onSelectAgent}
                            labelKey="agent"
                            valueKey="id"
                            error={errors?.agents as string}
                        />
                    </section>

                    <section className="flex flex-col gap-2">
                        <label className="text-[13px] font-semibold text-text-secondary">
                            Outcome
                        </label>

                        <AppMultiSelectDropdown
                            data={callOutcome}
                            value={values?.outcome || []}
                            onChange={onSelectOutcome}
                            labelKey="value"
                            valueKey="id"
                            error={errors?.outcome as string}
                        />
                    </section>

                    <section className="flex flex-col gap-3">
                        <label className="text-[13px] font-semibold text-text-secondary">
                            Duration
                        </label>

                        <div className="flex justify-between text-xs text-text-muted">
                            <span>{values.minDuration}s</span>
                            <span>{values.maxDuration}s</span>
                        </div>

                        <AppSlider
                            min={0}
                            max={300}
                            step={1}
                            value={[values?.minDuration, values?.maxDuration]}
                            onChange={onDurationChange}
                            error={errors?.maxDuration as string}
                        />
                    </section>

                    <section className="flex flex-col gap-2">
                        <label className="text-[13px] font-semibold text-text-secondary">
                            Date
                        </label>

                        <AppDatePicker
                            value={{ from: values?.fromDate, to: values?.toDate }}
                            onChange={setDateRange}
                            error={errors?.fromDate as string || errors?.toDate as string}
                        />
                    </section>
                </main>

                {/* Footer */}
                <footer
                    className="
                        flex gap-2.5
                        border-t border-border-light
                        p-5
                    "
                >
                    <AppButton
                        type="button"
                        style={{ cursor: 'pointer' }}
                        className="
                            flex h-11 flex-1
                            items-center justify-center
                            rounded-[10px]
                            border border-border
                            bg-background
                            text-sm font-semibold
                            text-text-secondary
                            transition-colors
                            hover:bg-slate-100
                        "
                        onClick={resetFilters}
                    >
                        Reset
                    </AppButton>

                    <AppButton
                        type="button"
                        onClick={formik.submitForm}
                        style={{ cursor: 'pointer' }}
                        className="
                            flex h-11 flex-1
                            items-center justify-center
                            rounded-[10px]
                            border border-primary
                            bg-primary
                            text-sm font-semibold
                            text-white
                            transition-opacity
                            hover:opacity-95
                        "
                    >
                        Apply
                    </AppButton>
                </footer>
            </aside>
        </>
    )
}

export default FilterDrawer