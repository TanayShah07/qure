import { NavLink } from "react-router-dom"
import { useState, useEffect } from "react"
import logo from "../assets/logo.svg"

const Navbar = () => {

const [show,setShow] = useState(true)
const [lastScroll,setLastScroll] = useState(0)

useEffect(()=>{

const handleScroll = () => {
const current = window.scrollY

if(current > lastScroll && current > 80){
setShow(false)
}else{
setShow(true)
}

setLastScroll(current)
}

window.addEventListener("scroll",handleScroll)
return ()=>window.removeEventListener("scroll",handleScroll)

},[lastScroll])

const linkStyle = ({ isActive }) => ({
color: isActive ? "#38bdf8" : "#e2e8f0",
textDecoration: "none",
fontWeight: isActive ? "600" : "400",
borderBottom: isActive ? "2px solid #38bdf8" : "none",
paddingBottom: "4px",
transition: "all 0.2s ease"
})

return (

<div
style={{
position:"fixed",
top: show ? "0" : "-90px",
left:"0",
width:"100%",
zIndex:1000,
display:"flex",
alignItems:"center",
justifyContent:"space-between",
padding:"16px 50px",
background:"linear-gradient(90deg, #0f172a, #1e293b)",
boxShadow:"0 2px 10px rgba(0,0,0,0.4)",
transition:"top 0.3s ease"
}}
>

<div
style={{
display:"flex",
alignItems:"center",
gap:"12px",
position:"relative",
cursor:"pointer"
}}
onMouseEnter={(e)=>{
const tooltip = e.currentTarget.querySelector(".tooltip")
tooltip.style.opacity = "1"
tooltip.style.transform = "translateY(0px)"
}}
onMouseLeave={(e)=>{
const tooltip = e.currentTarget.querySelector(".tooltip")
tooltip.style.opacity = "0"
tooltip.style.transform = "translateY(10px)"
}}
>

<img src={logo} alt="QURE Logo" style={{ height:"32px" }} />

<span style={{ fontSize:"20px", fontWeight:"bold", color:"#38bdf8" }}>
QURE
</span>

<div
className="tooltip"
style={{
position:"absolute",
top:"45px",
left:"0",
background:"#020617",
color:"#38bdf8",
padding:"6px 12px",
borderRadius:"8px",
fontSize:"12px",
whiteSpace:"nowrap",
opacity:"0",
transform:"translateY(10px)",
transition:"all 0.25s ease",
boxShadow:"0 4px 15px rgba(0,0,0,0.4)"
}}
>
Made by Tanay Shah
</div>

</div>

<div
style={{
position:"absolute",
left:"50%",
transform:"translateX(-50%)",
color:"#e2e8f0",
fontSize:"20px",
letterSpacing:"0.5px",
fontWeight:"500"
}}
>
Quantum Unified Resilient Encryption
</div>

<div style={{ display:"flex", gap:"35px", fontSize:"15px" }}>
<NavLink to="/" style={linkStyle}>Overview</NavLink>
<NavLink to="/chat" style={linkStyle}>Secure Chat</NavLink>
<NavLink to="/simulation" style={linkStyle}>Simulations</NavLink>
<NavLink to="/readiness" style={linkStyle}>Graphs</NavLink>
</div>

</div>

)

}

export default Navbar