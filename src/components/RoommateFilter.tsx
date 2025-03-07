'use client'

import { useEffect, useState } from "react"
import { CiSearch } from "react-icons/ci";
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./ui/select";
// import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ASCENDING, GENDER_VALUES, QUERY_PARAMS, cities } from "@/constants";
import { IoTimeOutline } from "react-icons/io5";
import { IoMdRemoveCircle } from "react-icons/io";
import { FaFilter } from "react-icons/fa";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useGlobalState from "@/context/hook";
import Filters from "./small-peices/Filters";
import SidebarFilter from "./SidebarFilter";
import { SearchRoommates } from "@/actions"
import { useSearch } from "@/context/SearchContext"

export type STATE_TYPE = {
    searchInput: string,
    openAgePopOver: boolean,
    openRoomStatus: boolean,
    minAge: string,
    minimumError: string | null,
    maxAge: string,
    maximumError: string | null
}

export const INITIAL_STATE : STATE_TYPE = {
    searchInput: "",
    openAgePopOver: false,
    openRoomStatus: false,
    minAge: "18",
    minimumError: null,
    maxAge: "45",
    maximumError: null
}

export default function RoommateFilter() {

    const [state, setState] = useState<STATE_TYPE>(INITIAL_STATE)
    const {openPreference, setOpenPreference, openFilter, setOpenFilter} = useGlobalState()
    const pathname = usePathname()
    const {replace} = useRouter()
    const searchParams = useSearchParams()
    const searchQuery = searchParams.get(QUERY_PARAMS.name)
    const { setSearchResults, setIsLoading } = useSearch()

    useEffect(() => {
        if(searchQuery && !state.searchInput){
            replace(`${pathname}`)
        }
    }, [state.searchInput])

    async function handleSearchByName(){
        if(!state.searchInput) return
        const params = new URLSearchParams(searchParams.toString())
        params.set(QUERY_PARAMS.name, state.searchInput)
        replace(`${pathname}?${params.toString()}`)

        try {
            setIsLoading(true)
            const results = await SearchRoommates({
                name: state.searchInput,
                gender: params.get(QUERY_PARAMS.gender) || undefined,
                city: params.get(QUERY_PARAMS.city) || undefined,
                minAge: state.minAge,
                maxAge: state.maxAge
            })
            setSearchResults(results)
        } catch (error) {
            console.error('Search failed:', error)
        } finally {
            setIsLoading(false)
        }
    }  

    function handleOpenSideFilter(){
        if(openPreference){
            setOpenPreference(false)
        }
        setOpenFilter((value) => !value)
    }


    return (
        <section className="w-full fixed top-20 left-0 px-5 bg-card flex max-xl:items-center xl:items-start max-xl:justify-center max-sm:gap-7 sm:gap-16 md:gap-16 lg:gap-20 xl:gap-1 max-xl:py-5 xl:py-4 z-10">
            {/* Search roommates by location */}
            <form onSubmit={(e) => {
                e.preventDefault()
                handleSearchByName()
            }} className="max-sm:w-[260px] sm:w-[350px] md:w-[400px] lg:w-[450px] xl:w-[305px] h-auto px-3 py-2 flex items-center justify-between border border-slate-700 bg-card rounded-md">
                <input type="text" placeholder="search by name" onChange={(e) => setState((data) => {
                    return {...data, searchInput: e.target.value}
                })} className="border-none bg-card w-[200px] p-2 text-sm text-primary focus-visible:outline-none"  />
                <button type="button" onClick={handleSearchByName} className="mr-3">
                    <CiSearch className="w-5 h-5 text-primary" />
                </button>
            </form>
            <button onClick={handleOpenSideFilter} className="xl:hidden">
                <FaFilter className="w-6 h-6 text-main" />
            </button>
            <div className="max-xl:hidden">
                <Filters state={state} setState={setState} />
            </div>
            {openFilter && <SidebarFilter state={state} setState={setState} setOpenFilter={setOpenFilter} />}
        </section>
    )
}