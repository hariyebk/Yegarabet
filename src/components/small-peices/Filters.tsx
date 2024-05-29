'use client'

import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ASCENDING, GENDER_VALUES, QUERY_PARAMS, cities } from "@/constants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IoTimeOutline } from "react-icons/io5";
import { IoMdRemoveCircle } from "react-icons/io";
import { STATE_TYPE, INITIAL_STATE } from "../RoommateFilter";

interface Props {
    state: STATE_TYPE,
    setState: React.Dispatch<React.SetStateAction<STATE_TYPE>>
    sidebar?: boolean
}

export default function Filters({state, setState, sidebar=false} : Props) {

    const searchParams = useSearchParams()
    const pathname = usePathname()
    const {replace} = useRouter()
    const minQuery = searchParams.get(QUERY_PARAMS.min)
    const maxQuery = searchParams.get(QUERY_PARAMS.max)
    const roomQuery = searchParams.get(QUERY_PARAMS.room)

    function handleFilterByGender(gender: string){
        const param = new URLSearchParams(searchParams)
        // If all is selected we don't need to update the query parameter because it's set by default
        if(gender === GENDER_VALUES.at(0)?.value){
            param.delete(QUERY_PARAMS.gender)
            replace(`${pathname}?${param}`)
            return
        }
        param.set(QUERY_PARAMS.gender, gender)
        replace(`${pathname}?${param}`)
    }

    function handleFilterBYCity(cityname: string){
        const param = new URLSearchParams(searchParams)
        if(cityname === cities.at(0)){
            param.delete(QUERY_PARAMS.city)
            replace(`${pathname}?${param}`)
            return
        }
        param.set(QUERY_PARAMS.city, cityname.replaceAll(" ", "_").toLowerCase())
        replace(`${pathname}?${param}`)
    }

    function handleAgeChange(){
        // Check if it's a number
        if(!/^\d+$/.test(state.minAge)){
            setState((values) => {
                return {...values, minimumError: "invalid input"}
            })
            return
        }
        // If the default values are not changed, return early
        if(state.minAge === INITIAL_STATE.minAge && state.maxAge === INITIAL_STATE.maxAge){
            setState((values) => {
                return {...values, openAgePopOver: false}
            })
            return
        }
        const minAge = parseInt(state.minAge)
        if(minAge < 18){
            setState((values) => {
                return {...values, minimumError: "age must be >= 18"}
            })
            return
        }
        if(minAge >= 59){
            setState((values) => {
                return {...values, minimumError: "too high"}
            })
            return
        }
        if(!/^\d+$/.test(state.maxAge)){
            setState((values) => {
                return {...values, maximumError: "invalid input"}
            })
            return
        }
        const maxAge = parseInt(state.maxAge)
        if(maxAge > 60){
            setState((values) => {
                return {...values, maximumError: "age must be < 60"}
            })
            return
        }
        if(maxAge <= 18){
            setState((values) => {
                return {...values, maximumError: "too low"}
            })
            return
        }
        const param = new URLSearchParams(searchParams)
        param.set(QUERY_PARAMS.min, minAge.toString())
        param.set(QUERY_PARAMS.max, maxAge.toString())
        replace(`${pathname}?${param}`)
        setState((values) => {
            return {...values, openAgePopOver: false}
        })
    }

    function handleRemoveAgeQuery(){
        const param = new URLSearchParams(searchParams)
        param.delete(QUERY_PARAMS.min)
        param.delete(QUERY_PARAMS.max)
        replace(`${pathname}?${param}`)
        // Set back to the defaults
        setState((values) => {
            return {...values, minAge: "18", maxAge: "45"}
        })
    }

    function handleFilterByRoomStatus(status: string){
        const param = new URLSearchParams(searchParams)
        param.set(QUERY_PARAMS.room, status)
        replace(`${pathname}?${param.toString()}`)
        setState((values) => {
            return {...values, openRoomStatus: false}
        })
    }

    function handleRemoveRoomStatus(){
        const param = new URLSearchParams(searchParams)
        param.delete(QUERY_PARAMS.room)
        replace(`${pathname}?${param}`)
    }

    function handleSort(value: string){
        const param = new URLSearchParams(searchParams)
        // Because by default it's Ascending 
        if(value === ASCENDING){
            param.delete(QUERY_PARAMS.sort)
            replace(`${pathname}?${param}`)
            return
        }
        param.set(QUERY_PARAMS.sort, value)
        replace(`${pathname}?${param}`)
    }

    return (
        <div className={`flex ${sidebar ? "flex-col gap-10 xl:hidden" : "flex-row gap-2"} items-center`}>
            {/* Select gender */}
            <Select onValueChange={(value) => handleFilterByGender(value)}>
                <SelectTrigger className={`bg-card border border-slate-700 ${sidebar ? "w-[200px]" : "w-[170px]"} h-[50px] ml-5 px-3 py-2.5 focus:border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-button focus:ring-0`}>
                    <SelectValue placeholder="Filter by gender"/>
                </SelectTrigger>
                <SelectContent className="bg-card border border-slate-700 text-primary">
                    {GENDER_VALUES.map((item) => {
                        return (
                            <SelectItem key={item.value} value={item.value}> {item.label} </SelectItem>
                        )
                    })
                    }
                </SelectContent>
            </Select>
            {/* Select location */}
            <Select onValueChange= {(value) => handleFilterBYCity(value)}>
                <SelectTrigger className={`bg-card border border-slate-700 ${sidebar ? "w-[200px]" : "w-[170px]"} h-[50px] ml-5 px-3 py-2.5 focus:border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-button focus:ring-0`}>
                    <SelectValue placeholder="Filter by city"/>
                </SelectTrigger>
                <SelectContent className="bg-card border border-slate-700 text-primary">
                    {cities.map((city) => {
                        return (
                            <div key={city}>
                                <SelectItem value={city} > {city} </SelectItem>
                            </div>
                        )
                    })}
                </SelectContent>
            </Select>
            {/* Age range */}
            <Popover>
                <PopoverTrigger asChild onClick={() => setState((values) => {
                        return {...values, openAgePopOver: true}
                    })}>
                    <button className={`${sidebar ? "w-[200px]" : "w-[150px]"} h-[50px] ml-5 flex items-center gap-3 bg-card border border-slate-700 rounded-md px-4 py-2.5 text-center`}>
                        { !minQuery && !maxQuery && <IoTimeOutline className="w-4 h-4 text-primary" />}
                        <div className="text-sm text-primary"> {minQuery && maxQuery ? <div className="flex items-center gap-3 bg-inherit">
                            <div onClick={handleRemoveAgeQuery} className="hover:cursor-pointer">
                                <IoMdRemoveCircle className="w-5 h-5 text-red-500" />
                            </div>
                            <div onClick={() => setState((values) => {
                                return {...values, openAgePopOver:  !values.openAgePopOver}
                            })} className="hover:cursor-pointer">
                                <p> {minQuery} - {maxQuery} </p>
                            </div>
                        </div> 
                        : "Age range"} 
                        </div>
                    </button>
                </PopoverTrigger>
                {state.openAgePopOver && <PopoverContent className="w-60 bg-card pl-10 border-slate-700 mt-3 z-10">
                    <div>
                        <p className="text-base text-primary"> Minimum age </p>
                        <input type="text" defaultValue={minQuery ? minQuery : state.minAge} onChange={(e) => setState((data) => {
                            return {...data, minAge: e.target.value}
                        })} className="w-32 mt-3 px-3 py-1.5 rounded-md focus-visible:outline-none border-none text-sm text-black" />
                        {state.minimumError && <p className="text-sm text-red-500 mt-2 flex flex-wrap leading-5"> {state.minimumError} </p>}
                    </div>
                    <div className="mt-4">
                        <p className="text-base text-primary"> Maximum age </p>
                        <input type="text" defaultValue={maxQuery ? maxQuery : state.maxAge} onChange={(e) => setState((data) => {
                            return {...data, maxAge: e.target.value}
                        })} className="w-32 mt-3 px-3 py-1.5 rounded-md focus-visible:outline-none border-none text-sm text-black" />
                        {state.maximumError && <p className="text-sm text-red-500 mt-2 flex flex-wrap leading-5"> {state.maximumError} </p>}
                    </div>
                    <button onClick={handleAgeChange} className="bg-button w-32 mt-7 px-3 py-1.5 rounded-md text-[15px] text-black font-semibold">
                        Save
                    </button>
                </PopoverContent>}
            </Popover>
            {/* ROOM STATUS */}
            <Popover>
                <PopoverTrigger asChild onClick={() => setState((values) => {
                        return {...values, openRoomStatus: true}
                    })}>
                    <button className={`${sidebar ? "w-[200px]" : "w-[180px]"} h-[50px] ml-5 bg-card border border-slate-700 rounded-md px-4 py-2.5 text-center`}>
                    {roomQuery ? <div className="flex items-center gap-3 bg-inherit">
                            <div onClick={handleRemoveRoomStatus} className="hover:cursor-pointer">
                                <IoMdRemoveCircle className="w-5 h-5 text-red-500" />
                            </div>
                            <div>
                                <p> {roomQuery} </p>
                            </div>
                    </div>  : 
                    <p className="text-sm text-primary"> Filter by room status </p>
                    }
                    </button>
                </PopoverTrigger>
                {state.openRoomStatus && <PopoverContent className="w-30 bg-card px-5 border-slate-700 mt-3 z-10 flex flex-col items-start">
                    <button onClick={() => handleFilterByRoomStatus("rented")} className="text-sm text-primary border border-slate-700 rounded-md px-3 py-2">
                        Already got a room
                    </button>
                    <button onClick={() => handleFilterByRoomStatus("seeking")} className="mt-5 text-sm text-primary border border-slate-700 rounded-md px-3 py-2">    
                        Needs a room
                    </button>
                </PopoverContent>}
            </Popover>
            {/* SORT BY DATE */}
            <Select onValueChange= {(value) => handleSort(value)}>
                <SelectTrigger className={`bg-card border border-slate-700 ${sidebar ? "w-[200px]" : "w-[170px]"} h-[50px] ml-5 px-3 py-2.5 focus:border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-button focus:ring-0`}>
                    <SelectValue placeholder="Sort by date"/>
                </SelectTrigger>
                <SelectContent className="bg-card border border-slate-700 text-primary">
                    <SelectItem value="ascending"> Ascending </SelectItem>
                    <SelectItem value="descending"> Descending </SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}
