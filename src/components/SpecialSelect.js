import {useState, useContext} from 'react'
import { SpecialContext } from '../utils/context'

function SpecialSelect(props){
    const [selectedSpecial, setSelectedSpecial] = useState()
    const specialsList = useContext(SpecialContext)
    let activeSpecial = null
    
    // if(specialsList){
    //     activeSpecial = specialsList?.find(special=>special. active)
    // }



    return(
        <div className="Special-Select">
            <h1>Special Select</h1>
            <select onChange={(e)=>{console.log(e.target.value)}}>
                <option></option>
                {specialsList ? 
               specialsList.map(special=>{
                return(
                    <option value={special} key={special.id}>{special.name}</option>
                )
               }) 
            : ''}
            </select>
            <h2>Current Special: {activeSpecial ? activeSpecial.name : ''}</h2>
        </div>
    )
}

export default SpecialSelect