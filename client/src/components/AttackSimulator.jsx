import { useState, useEffect } from "react"

const AttackSimulator = ({ message }) => {

const [algorithm,setAlgorithm] = useState(null)
const [attack,setAttack] = useState(null)
const [running,setRunning] = useState(false)
const [result,setResult] = useState(null)
const [reason,setReason] = useState("")
const [showReason,setShowReason] = useState(false)
const [progress,setProgress] = useState(0)
const [logs,setLogs] = useState([])
const [keys,setKeys] = useState([])

const handleBack = () => {
if (result) {
setResult(null)
setReason("")
setShowReason(false)
setAttack(null)
setLogs([])
setKeys([])
setProgress(0)
} else if (attack) {
setAttack(null)
setLogs([])
setKeys([])
setProgress(0)
} else if (algorithm) {
setAlgorithm(null)
}
}

const generateKey = () => {
const chars = "ABCDEF0123456789"
let str = ""
for (let i = 0; i < 16; i++) {
str += chars[Math.floor(Math.random() * chars.length)]
}
return str
}

const simulateAttack = (algo, atk) => {

setAlgorithm(algo)
setAttack(atk)
setRunning(true)
setResult(null)
setProgress(0)
setLogs([])
setKeys([])

let current = 0

const fakeLogs = [
"Initializing attack vectors...",
"Scanning keyspace...",
"Generating possible keys...",
"Testing key combinations...",
"Analyzing entropy...",
"Attempting decryption...",
"Checking validity..."
]

const interval = setInterval(() => {

current += 10
setProgress(current)

setLogs(prev => [
...prev,
fakeLogs[Math.floor(Math.random() * fakeLogs.length)]
])

setKeys(prev => [
generateKey(),
...prev.slice(0, 9)
])

if (current >= 100) {
clearInterval(interval)

let time = ""
let why = ""

if (algo === "RSA" && atk === "Brute Force") {
time = "~10^18 years"
why = "RSA security relies on factoring very large integers. Exhaustively testing every possible key would take astronomically long."
}

if (algo === "RSA" && atk === "Quantum") {
time = "Few hours (theoretical)"
why = "Quantum computers running Shor's Algorithm can factor large integers efficiently, breaking RSA."
}

if (algo === "Kyber" && atk === "Brute Force") {
time = "~10^25 years"
why = "Kyber is based on lattice cryptography. The number of possible secret vectors makes brute forcing computationally infeasible."
}

if (algo === "Kyber" && atk === "Quantum") {
time = "Not feasible"
why = "Kyber is designed to resist quantum attacks. No efficient quantum algorithm currently solves lattice problems."
}

setResult(time)
setReason(why)
setRunning(false)
}

}, 300)

}

return (

<div style={{marginTop:"35px"}}>

<h3>Attack Simulator</h3>

<div style={{marginBottom:"15px"}}>
Target Message: <b>{message.text}</b>
</div>

{!algorithm && (

<div style={{display:"flex",gap:"15px"}}>

<button onClick={()=>setAlgorithm("RSA")} style={{padding:"10px 20px",background:"#3b82f6",border:"none",borderRadius:"8px",color:"white"}}>
Attack RSA
</button>

<button onClick={()=>setAlgorithm("Kyber")} style={{padding:"10px 20px",background:"#22c55e",border:"none",borderRadius:"8px",color:"white"}}>
Attack Kyber
</button>

</div>

)}

{algorithm && !attack && (

<div style={{display:"flex",gap:"15px",marginTop:"10px"}}>

<button onClick={()=>simulateAttack(algorithm,"Brute Force")} style={{padding:"10px 20px",background:"#f97316",border:"none",borderRadius:"8px",color:"white"}}>
Brute Force Attack
</button>

<button onClick={()=>simulateAttack(algorithm,"Quantum")} style={{padding:"10px 20px",background:"#a855f7",border:"none",borderRadius:"8px",color:"white"}}>
Quantum Attack
</button>

<button onClick={handleBack} style={{padding:"10px 20px",background:"#ef4444",border:"none",borderRadius:"8px",color:"white"}}>
Back
</button>

</div>

)}

{running && (

<div style={{marginTop:"20px"}}>

<div style={{marginBottom:"8px"}}>
Attacking message...
</div>

<div style={{width:"100%",height:"12px",background:"#334155",borderRadius:"10px",overflow:"hidden"}}>
<div style={{width:`${progress}%`,height:"100%",background:"#22c55e",transition:"width 0.3s"}} />
</div>

<div style={{marginTop:"6px"}}>
{progress}%
</div>

<div style={{marginTop:"15px",background:"#020617",padding:"12px",borderRadius:"8px",height:"120px",overflowY:"auto",fontFamily:"monospace",fontSize:"13px"}}>
{logs.map((log,index)=>(
<div key={index} style={{color:"#38bdf8"}}>{"> "}{log}</div>
))}
</div>

<div style={{marginTop:"15px",background:"#020617",padding:"12px",borderRadius:"8px",height:"120px",overflowY:"auto",fontFamily:"monospace",fontSize:"13px"}}>
{keys.map((key,index)=>(
<div key={index} style={{color:"#22c55e"}}>{key}</div>
))}
</div>

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

<button onClick={()=>setShowReason(!showReason)} style={{marginTop:"15px",padding:"8px 16px",background:"#38bdf8",border:"none",borderRadius:"8px"}}>
Reason
</button>

<button onClick={handleBack} style={{marginTop:"10px",padding:"8px 16px",background:"#ef4444",border:"none",borderRadius:"8px",color:"white"}}>
Back
</button>

{showReason && (
<div style={{marginTop:"15px",background:"#0f172a",padding:"15px",borderRadius:"8px",lineHeight:"1.6"}}>
{reason}
</div>
)}

</div>

)}

</div>

)

}

export default AttackSimulator