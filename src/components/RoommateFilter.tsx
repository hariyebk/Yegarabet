'use client'

import { useState } from "react"
import toast from "react-hot-toast";
import { CiSearch } from "react-icons/ci";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectLabel, SelectItem } from "./ui/select";
import { cities } from "@/constants";

export default function RoommateFilter() {

    const [searchInput, setSearchInput] = useState<string>("")
    const [GenderSelect, setGenderSelect] = useState<string>("")
    const [openAgePopOver, setOpenAgePopOver] = useState<boolean>(false)

    function handleSearch(){
        if(!searchInput){
            toast.error("No query string was provided")
            return
        }
        //
    }   

    return (
        <section className="w-full flex flex-wrap items-start gap-2">
            {/* Search roommates by location */}
            <form onSubmit={(e) => {
                e.preventDefault()
                handleSearch()
            }} className="w-[240px] h-[50px] px-3 py-2 flex items-center justify-between border border-slate-700 bg-card rounded-md">
                <input type="text" defaultValue="Addis Ababa" onChange={(e) => setSearchInput(e.target.value)} className="border-none bg-card w-[200px] p-2 text-sm text-primary focus-visible:outline-none"  />
                <button type="button" onClick={handleSearch} className="mr-3">
                    <CiSearch className="w-5 h-5 text-primary" />
                </button>
            </form>
            {/* Select gender */}
            <Select onValueChange= {(value) => setGenderSelect(value)}>
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
            <Select onValueChange= {(value) => setGenderSelect(value)}>
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
            <button onClick={() => setOpenAgePopOver((open) => !open)} className="w-[150px] h-[50px] ml-5 bg-card border border-slate-700 rounded-md px-3 py-2.5 text-center">
                Age range
                {/* <div className="mt-7 absolute -left-10 bg-card border border-slate-700 w-[250px] h-[80px] px-4 focus-visible:outline-none rounded-md">
        
                </div> */}
            </button>
        </section>

    )
}
