'use client'

import { PAGE_SIZE, QUERY_PARAMS } from "@/constants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

interface Props {
    TotalResults: number
}

export default function Pagination({TotalResults} : Props) {

    const searchParams = useSearchParams()
    const pathname = usePathname()
    const {replace} = useRouter()
    const totalPages = TotalResults / PAGE_SIZE
    const currentPage = searchParams.get(QUERY_PARAMS.page) || "1"

    function handlePrevious(){
        if(currentPage === "1") return
        const previousPage = parseInt(currentPage) - 1
        handlePageClick(previousPage)
    }

    function handleNext(){
        if(currentPage === totalPages.toString()) return
        const nextPage = parseInt(currentPage) + 1
        handlePageClick(nextPage)
    }

    function handlePageClick(pageNumber: number){
        const param = new URLSearchParams(searchParams);
        param.set(QUERY_PARAMS.page, pageNumber.toString());
        replace(`${pathname}?${param.toString()}`)
    }

    return (
        <section className="xl:pr-7 w-full flex max-xl:justify-center xl:justify-end">
            {totalPages <= 1 ? null : <div className="w-fit flex items-center justify-between">
                <button onClick={handlePrevious}>
                    <IoIosArrowBack className="w-5 h-5 text-secondary" />
                </button> 
                <div className="flex items-center gap-5 px-10">
                    {/* {totalPages > 5 ?  : ""} */}
                    {Array.from({length: totalPages}, (_, index) => index + 1).map((pageNumber, i) => {
                        return (
                            <button key={i} onClick={() => handlePageClick(pageNumber)} className={`${parseInt(currentPage) === pageNumber ? "bg-main text-primary" : "bg-secondary text-black"} px-3 py-1 rounded-sm text-[15px]`}>
                                {pageNumber}
                            </button>
                        )
                    })}
                </div>
                <button onClick={handleNext}>
                    <IoIosArrowForward className="w-5 h-5 text-secondary" />
                </button>   
            </div>}
        </section>
    )
}
