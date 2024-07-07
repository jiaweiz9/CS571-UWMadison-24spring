import { useContext } from "react"
import BadgerBudsDataContext from "../../../contexts/BadgerBudsDataContext"
import BadgerBudsSummary from "../../BadgerBudsSummary"

export default function BadgerBudsAdoptable(props) {
    let data = useContext(BadgerBudsDataContext)
    console.log("adoptable", data)
    return <BadgerBudsSummary />
}