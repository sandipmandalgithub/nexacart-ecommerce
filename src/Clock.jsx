import { useEffect, useState } from "react"

const Clock =({color})=>{
    const[time,setTime]=useState(0)

    useEffect(()=>{
        setInterval(()=>{
            setTime(new Date().toLocaleTimeString());
        },1000);
    },[])

    return(
     <div>
     <h1 style={{color :color, background:'#005',width :'400px', padding:'30px'}}>{time}</h1>
     
     </div>

    )
    
}
export default Clock