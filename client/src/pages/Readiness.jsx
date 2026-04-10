import ScrollTop from "../components/ScrollTop" 
import { useState } from "react"
import { Bar } from "react-chartjs-2"
import {
Chart as ChartJS,
CategoryScale,
LinearScale,
BarElement,
Title,
Tooltip,
Legend
} from "chart.js"

ChartJS.register(
CategoryScale,
LinearScale,
BarElement,
Title,
Tooltip,
Legend
)

const Readiness = () => {

const [openSection,setOpenSection] = useState(null)
const [selectedAttack,setSelectedAttack] = useState(null)

const toggleSection = (section) => {
setOpenSection(openSection === section ? null : section)
}

const attackDetails = {
"Integer Factorization": {
desc: "Breaking encryption by factoring a large number into primes.",
relation: "RSA relies entirely on factorization difficulty, so it is vulnerable. Kyber does not use this structure."
},
"Shor’s Quantum Algorithm": {
desc: "Quantum algorithm that efficiently factors integers.",
relation: "Directly breaks RSA in polynomial time. Kyber is resistant to this attack."
},
"Brute Force": {
desc: "Trying all possible keys until correct one is found.",
relation: "Both RSA and Kyber have extremely large keyspaces making brute force infeasible."
},
"Chosen Ciphertext": {
desc: "Attacker can decrypt chosen ciphertexts to gain information.",
relation: "RSA without padding is vulnerable. Kyber includes protections against this."
},
"Chosen Plaintext": {
desc: "Attacker can encrypt chosen messages to analyze patterns.",
relation: "RSA can leak patterns if improperly used. Kyber resists such attacks."
},
"Side Channel Attack": {
desc: "Exploits physical implementation like power or timing.",
relation: "Both RSA and Kyber are vulnerable if implementation is weak."
},
"Timing Attack": {
desc: "Uses execution time differences to extract keys.",
relation: "Both systems can leak timing info without proper protections."
},
"Power Analysis": {
desc: "Observes power consumption to derive secrets.",
relation: "Affects both RSA and Kyber hardware implementations."
},
"Lattice Reduction (BKZ/LLL)": {
desc: "Advanced math attacks to solve lattice problems.",
relation: "Targets Kyber specifically, but still computationally infeasible at strong parameters."
},
"Grover’s Algorithm": {
desc: "Quantum search algorithm that speeds up brute force.",
relation: "Provides quadratic speedup but still not enough to break strong keys."
}
}

const chartOptions = {
responsive: true,
maintainAspectRatio: false,
plugins: {
legend: {
labels: { color: "white" }
}
},
scales: {
x: {
ticks: { color: "white" },
grid: { color: "#334155" }
},
y: {
ticks: { color: "white" },
grid: { color: "#334155" }
}
}
}

const wrapperStyle = {
minHeight: "100vh",
width: "100%",
backgroundColor: "#0f172a",
color: "white",
paddingTop: "120px",
paddingBottom: "60px"
}

const contentStyle = {
width: "100%",
maxWidth: "1100px",
margin: "0 auto",
padding: "0 40px"
}

const sectionStyle = {
marginBottom: "90px"
}

const chartBox = {
width: "100%",
maxWidth: "750px",
height: "300px",
margin: "20px auto"
}

const dropdownButton = {
display: "block",
margin: "20px auto 0 auto",
padding: "10px 22px",
borderRadius: "8px",
border: "1px solid #334155",
background: "#1e293b",
color: "white",
cursor: "pointer",
fontWeight: "500"
}

const explanationStyle = {
marginTop: "20px",
padding: "18px",
background: "linear-gradient(145deg,#1e293b,#111827)",
borderRadius: "12px",
lineHeight: "1.7",
border: "1px solid #334155"
}

const graphs = [
{
id: "key",
title: "1. Key Size Comparison",
data: {
labels: ["RSA", "Kyber"],
datasets: [{ label: "Key Size (bits)", data: [3072, 9472], backgroundColor: ["#38bdf8","#22c55e"] }]
},
text: "RSA uses integer factorization and typically smaller keys compared to Kyber. Kyber requires larger key sizes due to lattice-based structures but provides quantum resistance."
},
{
id: "compute",
title: "2. Computation Time Comparison",
data: {
labels: ["RSA", "Kyber"],
datasets: [{ label: "Computation Time", data: [8,3], backgroundColor: ["#facc15","#22c55e"] }]
},
text: "RSA relies on modular exponentiation, while Kyber uses efficient polynomial arithmetic."
},
{
id: "space",
title: "3. Ciphertext Size Comparison",
data: {
labels: ["RSA", "Kyber"],
datasets: [{ label: "Ciphertext Size", data: [256,1088], backgroundColor: ["#ef4444","#22c55e"] }]
},
text: "Kyber produces larger ciphertexts due to lattice noise."
},
{
id: "power",
title: "4. Power Consumption Comparison",
data: {
labels: ["RSA", "Kyber"],
datasets: [{ label: "Power Consumption", data: [9,4], backgroundColor: ["#a855f7","#22c55e"] }]
},
text: "RSA consumes more energy than Kyber."
}
]

return (
<div style={wrapperStyle}>
<div style={contentStyle}>
<ScrollTop />

{graphs.map(graph=>(
<div key={graph.id} style={sectionStyle}>
<h2 style={{textAlign:"center"}}>{graph.title}</h2>

<div style={chartBox}>
<Bar data={graph.data} options={chartOptions}/>
</div>

<button onClick={()=>toggleSection(graph.id)} style={dropdownButton}>
{openSection===graph.id?"▲ Hide Explanation":"▼ Explain Graph"}
</button>

{openSection===graph.id && (
<div style={explanationStyle}>{graph.text}</div>
)}

</div>
))}

<h2 style={{textAlign:"center",marginTop:"70px",marginBottom:"20px"}}>
Security Resistance Comparison
</h2>

<p style={{textAlign:"center",marginBottom:"20px"}}>
✔ = Vulnerable &nbsp;&nbsp; ❌ = Not Vulnerable &nbsp;&nbsp; — = Not Applicable
</p>

<table style={{width:"100%",borderCollapse:"collapse",backgroundColor:"#1e293b"}}>
<thead>
<tr>
<th style={{padding:"15px",border:"1px solid #334155"}}>Attack</th>
<th style={{padding:"15px",border:"1px solid #334155"}}>RSA</th>
<th style={{padding:"15px",border:"1px solid #334155"}}>Kyber</th>
<th style={{padding:"15px",border:"1px solid #334155"}}>Info</th>
</tr>
</thead>

<tbody>
{Object.keys(attackDetails).map(name=>(
<tr key={name}>
<td style={{padding:"15px",border:"1px solid #334155"}}>{name}</td>
<td style={{padding:"15px",border:"1px solid #334155"}}>
{["Integer Factorization","Shor’s Quantum Algorithm","Chosen Ciphertext","Chosen Plaintext"].includes(name) ? "✔" :
["Brute Force","Side Channel Attack","Timing Attack","Power Analysis"].includes(name) ? "✔" : "—"}
</td>
<td style={{padding:"15px",border:"1px solid #334155"}}>
{["Lattice Reduction (BKZ/LLL)"].includes(name) ? "✔" :
["Side Channel Attack","Timing Attack","Power Analysis"].includes(name) ? "✔" :
["Shor’s Quantum Algorithm","Chosen Ciphertext","Chosen Plaintext"].includes(name) ? "❌" :
["Brute Force"].includes(name) ? "❌" : "—"}
</td>

<td style={{padding:"15px",border:"1px solid #334155"}}>
<button onClick={()=>setSelectedAttack(name)} style={{
padding:"6px 12px",
background:"#38bdf8",
border:"none",
borderRadius:"6px",
cursor:"pointer",
color:"#020617"
}}>
See Info
</button>
</td>
</tr>
))}
</tbody>
</table>

{selectedAttack && (
<div style={{
position:"fixed",
top:"0",
left:"0",
width:"100%",
height:"100%",
background:"rgba(0,0,0,0.6)",
display:"flex",
alignItems:"center",
justifyContent:"center",
zIndex:2000
}}>
<div style={{
background:"linear-gradient(145deg,#1e293b,#020617)",
padding:"30px",
borderRadius:"14px",
width:"420px",
border:"1px solid #334155"
}}>

<div style={{display:"flex",justifyContent:"space-between",marginBottom:"15px"}}>
<h3>{selectedAttack}</h3>
<button onClick={()=>setSelectedAttack(null)} style={{
background:"#ef4444",
border:"none",
padding:"5px 10px",
borderRadius:"6px",
color:"white"
}}>
Close
</button>
</div>

<div style={{marginBottom:"12px",color:"#cbd5f5"}}>
{attackDetails[selectedAttack].desc}
</div>

<div style={{background:"#020617",padding:"12px",borderRadius:"8px",color:"#22c55e"}}>
{attackDetails[selectedAttack].relation}
</div>

</div>
</div>
)}

</div>
</div>
)
}

export default Readiness