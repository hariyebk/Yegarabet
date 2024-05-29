'use client'

import { IoCloseCircleSharp } from "react-icons/io5";
import { STATE_TYPE } from "./RoommateFilter";
import Filters from "./small-peices/Filters";

interface Props {
    state: STATE_TYPE,
    setState: React.Dispatch<React.SetStateAction<STATE_TYPE>>
    setOpenFilter: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SidebarFilter({state, setState, setOpenFilter} : Props) {
    return (
        <section className="xl:hidden absolute top-0 right-0 w-[280px] h-auto bg-card border border-slate-700 z-20 pt-7 pb-14">
            <div className="overflow-y-scroll custom-scrollbar">
                <div className="flex items-center justify-end pr-5">
                    <button onClick={() => setOpenFilter(false)} className="focus-visible:outline-none">
                        <IoCloseCircleSharp className="w-8 h-8 text-button" />
                    </button>
                </div>
                <div className="mt-10">
                    <Filters state={state} setState={setState} sidebar={true} />
                </div>
            </div>
        </section>
    )
}
