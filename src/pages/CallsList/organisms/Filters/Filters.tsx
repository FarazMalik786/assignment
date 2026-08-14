import AppButton from "@appComponents/app-button/AppButton"
import AppTextInput from "@appComponents/app-textinput/AppTextinput"
import { ListFilter, Search } from "lucide-react"
import { useCallback, useState, type ChangeEvent } from "react"
import { useSearchParams } from "react-router-dom"
import { getFilterBtnCount } from "@utils/filterUtils"
import { CALL_FILTER_KEYS } from "@constants/callConstants"
import FilterDrawer from "./FilterDrawer"
import { useCallsStore } from "@store/callsStore"

let timeout: ReturnType<typeof setTimeout> | null;
function Filters() {
    const setCallsLoading = useCallsStore((state) => state.setCallsLoading);
    const [showFilters, setShowFilters] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams?.get(CALL_FILTER_KEYS?.SEARCH);
    const [searchText, setSearchText] = useState(searchQuery);

    const filtersCount = getFilterBtnCount();

    function debounce(func: any, delay: number) {
        return (...args: Parameters<any>) => {
            if (timeout) clearTimeout(timeout);
            timeout = setTimeout(() => {
                func(...args);
                timeout = null;
            }, delay);
        };
    }

    async function searchHandler(e: ChangeEvent<HTMLInputElement>) {
        const value = e?.target?.value;
        setSearchText(value);
        setCallsLoading(true);
        const searchFunc = debounce(onSearch, 1500);
        searchFunc(value);
    }

    async function onSearch(text: string = "") {
        const params = new URLSearchParams(window.location.search);
        params.delete(CALL_FILTER_KEYS?.SEARCH)
        if (text?.length > 1) params.append(CALL_FILTER_KEYS?.SEARCH, text);
        setSearchParams(params);
        setCallsLoading(false)
    }

    const FilterDrawerCloseHandler = useCallback(() => {
        setShowFilters(false)
    }, []);


    return (
        <>
            <div className="mb-4 flex w-full flex-col gap-3 p-3">
                <div className="flex w-full items-center gap-2.5">
                    {/* Filter button */}

                    <div className="relative">
                        <AppButton
                            type="button"
                            onClick={() => setShowFilters(true)}
                            aria-label="Open filters"
                            className="
                                flex h-10 w-10 shrink-0 items-center justify-center
                                rounded-[10px]
                                border border-border
                                bg-white
                                text-text-muted
                                transition-colors
                                hover:border-primary
                                hover:bg-primary-light
                                hover:text-primary
                                active:scale-[0.98]
                            "
                        >
                            <ListFilter className="h-4 w-4" />
                        </AppButton>

                        {filtersCount > 0 && (
                            <span
                                className="
                                    absolute -right-1.5 -top-1.5
                                    flex h-5 min-w-5
                                    items-center justify-center
                                    rounded-full
                                    bg-red-700 px-1
                                    text-[11px] font-semibold
                                    leading-none text-white
                                "
                            >
                                {filtersCount}
                            </span>
                        )}
                    </div>

                    {/* Search */}
                    <AppTextInput
                        type="text"
                        placeholder="Search ..."
                        value={searchText || ""}
                        leftIcon={
                            <Search className="h-4 w-4 text-text-muted" />
                        }
                        onChange={searchHandler}
                        className={
                            `
        h-10
        w-full
        rounded-[10px]
        border border-border
        bg-white
        pr-3.5
        text-sm
        text-text-primary
        placeholder:text-text-muted
        transition
        focus:border-primary
        focus:ring-2
        focus:ring-primary-light
        `
                        }
                    />
                </div>
            </div>



            <FilterDrawer
                open={showFilters}
                onClose={FilterDrawerCloseHandler}
            />


        </>
    )
}

export default Filters
