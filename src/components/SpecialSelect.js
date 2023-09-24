import {useState, useContext, useEffect} from 'react'
import { SpecialContext } from '../utils/context'
import { supabase } from '../utils/supabase'

function SpecialSelect(props){
    const [selectedSpecial, setSelectedSpecial] = useState()
    const specialsList = useContext(SpecialContext)
    const activeSpecial = specialsList?.find(special=>{  
        return special.active===true
    })

    
   async function setActiveSpecial(){
    if(selectedSpecial !== activeSpecial){

        const obj1 = await supabase
        .from('Specials')
        .update({ 'active': 'false' })
        .eq('active', 'true')
        .select()
        const obj2 = await supabase
        .from('Specials')
        .update({ 'active': 'true' })
        .eq('id', selectedSpecial)
        .select()
        console.log(obj1, obj2)

   }
   }
   async function clearSpecial(){
    const { data, error } = await supabase
        .from('Specials')
        .update({ 'active': 'false' })
        .eq('active', 'true')
        .select()
   }
   useEffect(()=>{

   })


    return(
        <div className="Special-Select">
            <h1>Special Select</h1>
            <select onChange={(e)=>{setSelectedSpecial(e.target.value)}}>
                <option></option>
                {specialsList ? 
               specialsList.map(special=>{
                return(
                    <option value={special.id} key={special.id}>{special.name}</option>
                )
               }) 
            : ''}
            </select>
            <button onClick={()=>{setActiveSpecial()}}>Set Special</button>
            <button onClick={()=>{clearSpecial()}}>Clear Special</button>
            <h2>Current Special: {activeSpecial ? activeSpecial.name : ''}</h2>
        </div>
    )
}

export default SpecialSelect