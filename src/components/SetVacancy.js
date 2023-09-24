import { useContext, useState } from "react"
import { VacancyContext } from "../utils/context"

function SetVacancy(props){
    const [selectedVacancy, setSelectedVacancy] = useState(0)
    const vacancy = useContext(VacancyContext)
    const activeVacancy = vacancy?.find((vacancy)=>{
        console.log(vacancy.active)
        return vacancy.active==='true'
    }
        )

    return(
        <div className="SetVacancy">
            <h1>Set Vacancy</h1>
            <select onChange={(e)=>{
                setSelectedVacancy(e.target.value)

            }
                }>
                <option></option>
                {   vacancy ?
                    vacancy.map(status =>{
                        return(
                            <option value={status.id} key={status.id}>{status.color}: {status.description}</option>
                        )
                    }) : ''
                }
            </select>
            <button onClick={()=>{

                props.changeVacancy(selectedVacancy)}
                
                }>Set Vacancy Status</button>
            <button onClick={()=>{props.changeVacancy(-1)}}>Clear Vacancy Status</button>
            <p>Current Vacancy Status</p>
            <p>{activeVacancy ? activeVacancy.color : 'N/A'}</p>
        </div>
    )
}
export default SetVacancy