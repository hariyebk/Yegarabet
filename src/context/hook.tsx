import { useContext } from "react"
import { GlobalConext } from "./Provider"

export default function useGlobalState(){
    const context = useContext(GlobalConext)
    if(!context) throw new Error("context is used out of it's provider")
    return context
}