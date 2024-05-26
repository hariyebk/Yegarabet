'use client'

import { useState } from "react"
import toast from "react-hot-toast";
import { CiSearch } from "react-icons/ci";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./ui/select";
import { cities } from "@/constants";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

type STATE_TYPE = {
    searchInput: string,
    selectGender: string,
    selectCity: string,
    openAgePopOver: boolean,
    minAge: number,
    maxAge: number
}

const INITIAL_STATE : STATE_TYPE = {
    searchInput: "",
    selectGender: "",
    selectCity: "",
    openAgePopOver: false,
    minAge: 18,
    maxAge: 45
}

export default function RoommateFilter() {

    const [state, setState] = useState<STATE_TYPE>(INITIAL_STATE)

    function handleSearch(){
        if(!state.searchInput){
            toast.error("No query string was provided")
            return
        }
        //
    }  
    
    function handleAgeChange(){
        if(state.minAge < 18){
            toast.error("the minimum age allowed is 18")
        }
    }

    return (
        <section className="w-full flex flex-wrap items-start gap-2">
            {/* Search roommates by location */}
            <form onSubmit={(e) => {
                e.preventDefault()
                handleSearch()
            }} className="w-[305px] h-[50px] px-3 py-2 flex items-center justify-between border border-slate-700 bg-card rounded-md">
                <input type="text" placeholder="search by city" onChange={(e) => setState((data) => {
                    return {...data, searchInput: e.target.value}
                })} className="border-none bg-card w-[200px] p-2 text-sm text-primary focus-visible:outline-none"  />
                <button type="button" onClick={handleSearch} className="mr-3">
                    <CiSearch className="w-5 h-5 text-primary" />
                </button>
            </form>
            {/* Select gender */}
            <Select onValueChange= {(value) => setState((data) => {
                return {...data, selectGender: value}
            })}>
                <SelectTrigger className="bg-card border border-slate-700 w-[170px] h-[50px] ml-5 px-3 py-2.5 focus:border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-button focus:ring-0">
                    <SelectValue placeholder="Select Gender"/>
                </SelectTrigger>
                <SelectContent className="bg-card border border-slate-700 text-primary">
                    <SelectItem value="All"> All </SelectItem>
                    <SelectItem value="Male"> Male </SelectItem>
                    <SelectItem value="Female"> Female </SelectItem>
                </SelectContent>
            </Select>
            {/* Select location */}
            <Select onValueChange= {(value) => setState((data) => {
                return {...data, selectCity: value}
            })}>
                <SelectTrigger className="bg-card border border-slate-700 w-[170px] h-[50px] ml-5 px-3 py-2.5 focus:border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-button focus:ring-0">
                    <SelectValue placeholder="Select City"/>
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
                <PopoverTrigger asChild>
                    <button onClick={() => setState((data) => {
                        return {...data, openAgePopOver: !data.openAgePopOver}
                    })} className="w-[150px] h-[50px] ml-5 bg-card border border-slate-700 rounded-md px-3 py-2.5 text-center">
                    Age range
                    </button>
                </PopoverTrigger>
                <PopoverContent className="w-60 bg-card pl-10 border-slate-700 mt-3 z-10">
                    <div>
                        <p className="text-base text-primary"> Minimum age </p>
                        <input type="text" placeholder="18" onChange={(e) => setState((data) => {
                            return {...data, minAge: parseInt(e.target.value)}
                        })} className="w-32 mt-3 px-3 py-1.5 rounded-md focus-visible:outline-none border-none text-sm text-black" />
                    </div>
                    <div className="mt-4">
                        <p className="text-base text-primary"> Maximum age </p>
                        <input type="text" placeholder="45" onChange={(e) => setState((data) => {
                            return {...data, maxAge: parseInt(e.target.value)}
                        })} className="w-32 mt-3 px-3 py-1.5 rounded-md focus-visible:outline-none border-none text-sm text-black" />
                    </div>
                    <button onClick={handleAgeChange} className="bg-button w-32 mt-7 px-3 py-2 rounded-md text-[15px] text-black font-semibold">
                        Save
                    </button>
                </PopoverContent>
            </Popover>
        </section>

    )
}
