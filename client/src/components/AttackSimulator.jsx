import { useState, useEffect } from "react"

const AttackSimulator = ({message}) => {

const [algorithm,setAlgorithm] = useState(null)
const [attack,setAttack] = useState(null)
const [running,setRunning] = useState(false)
const [result,setResult] = useState(null)
const [reason,setReason] = useState("")
const [showReason,setShowReason] = useState(false)
const [dots,setDots] = useState("")

useEffect(()=>{

if(!running) return

const interval=setInterval(()=>{
setDots(prev=>{
if(prev==="...") return "."
if(prev==="..") return "..."
if(prev===".") return ".."
return "."
})
},400)

return ()=>clearInterval(interval)

},[running])

const simulateAttack=(algo,atk)=>{

setAlgorithm(algo)
setAttack(atk)
setRunning(true)
setResult(null)

setTimeout(()=>{

let time=""
let why=""

if(algo==="RSA" && atk==="Brute Force"){
time="~10^18 years"
why="RSA security relies on the difficulty of factoring very large integers. Exhaustively testing every possible key would take astronomically long."
}

if(algo==="RSA" && atk==="Quantum"){
time="Few hours (theoretical)"
why="Quantum computers running Shor's Algorithm can factor large integers efficiently, breaking RSA."
}

if(algo==="Kyber" && atk==="Brute Force"){
time="~10^25 years"
why="Kyber is based on lattice cryptography. The number of possible secret vectors makes brute forcing computationally infeasible."
}

if(algo==="Kyber" && atk==="Quantum"){
time="Not feasible"
why="Kyber is designed to resist quantum attacks. No efficient quantum algorithm currently solves lattice problems."
}

setResult(time)
setReason(why)
setRunning(false)

},3000)

}

return(

<div style={{marginTop:"35px"}}>

<h3>Attack Simulator</h3>

<div style={{marginBottom:"15px"}}>
Target Message: <b>{message.text}</b>
</div>

{!algorithm && (

<div style={{display:"flex",gap:"15px"}}>

<button
onClick={()=>setAlgorithm("RSA")}
style={{
padding:"10px 20px",
background:"#3b82f6",
border:"none",
borderRadius:"8px",
color:"white",
cursor:"pointer"
}}
>
Attack RSA
</button>

<button
onClick={()=>setAlgorithm("Kyber")}
style={{
padding:"10px 20px",
background:"#22c55e",
border:"none",
borderRadius:"8px",
color:"white",
cursor:"pointer"
}}
>
Attack Kyber
</button>

</div>

)}

{algorithm && !attack && (

<div style={{display:"flex",gap:"15px",marginTop:"10px"}}>

<button
onClick={()=>simulateAttack(algorithm,"Brute Force")}
style={{
padding:"10px 20px",
background:"#f97316",
border:"none",
borderRadius:"8px",
color:"white"
}}
>
Brute Force Attack
</button>

<button
onClick={()=>simulateAttack(algorithm,"Quantum")}
style={{
padding:"10px 20px",
background:"#a855f7",
border:"none",
borderRadius:"8px",
color:"white"
}}
>
Quantum Attack
</button>

</div>

)}

{running && (

<div style={{marginTop:"20px",fontSize:"18px"}}>
Attacking message{dots}
</div>

)}

{result && (

<div style={{marginTop:"25px"}}>

<div style={{fontSize:"18px"}}>
Estimated time required to decrypt message:
</div>

<div style={{fontSize:"22px",marginTop:"8px",fontWeight:"bold"}}>
{result}
</div>

<button
onClick={()=>setShowReason(!showReason)}
style={{
marginTop:"15px",
padding:"8px 16px",
background:"#38bdf8",
border:"none",
borderRadius:"8px",
cursor:"pointer"
}}
>
Reason
</button>

{showReason && (

<div style={{
marginTop:"15px",
background:"#0f172a",
padding:"15px",
borderRadius:"8px",
lineHeight:"1.6"
}}>
{reason}
</div>

)}

</div>

)}

</div>

)

}

export default AttackSimulator