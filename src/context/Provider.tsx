"use client"

import { IcontextType } from "@/constants"
import { getSession } from "@/utils"
import { createContext, useEffect, useState } from "react"
import toast from "react-hot-toast"

interface AuthProviderProps {
    children: React.ReactNode
}

const Initial_State: IcontextType = {
    openFilter: false,
    openPreference: false,
    setOpenFilter: () => {},
    setOpenPreference: () => {}
}

export const GlobalConext = createContext<IcontextType>(Initial_State)

export default function StateProvider({children}: AuthProviderProps){

    const [openFilter, setOpenFilter] = useState<boolean>(false)
    const [openPreference, setOpenPreference] = useState<boolean>(false)

    return (
        <GlobalConext.Provider value={{
            openFilter,
            openPreference,
            setOpenFilter,
            setOpenPreference
        }}>
            {children}
        </GlobalConext.Provider>
    )
}