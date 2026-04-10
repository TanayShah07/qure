import { useState, useEffect } from "react"

const ScrollTop = () => {

const [visible,setVisible] = useState(false)

useEffect(()=>{

const handleScroll = () => {
if(window.scrollY > 200){
setVisible(true)
}else{
setVisible(false)
}
}

window.addEventListener("scroll",handleScroll)
return ()=>window.removeEventListener("scroll",handleScroll)

},[])

const scrollToTop = () => {
window.scrollTo({
top:0,
behavior:"smooth"
})
}

return (

visible && (

<button
onClick={scrollToTop}
style={{
position:"fixed",
bottom:"30px",
right:"30px",
width:"50px",
height:"50px",
borderRadius:"50%",
background:"#38bdf8",
border:"none",
cursor:"pointer",
zIndex:1000,
display:"flex",
alignItems:"center",
justifyContent:"center",
boxShadow:"0 4px 20px rgba(0,0,0,0.4)"
}}
>

<div style={{
width:0,
height:0,
borderLeft:"8px solid transparent",
borderRight:"8px solid transparent",
borderBottom:"12px solid #020617"
}} />

</button>

)

)

}

export default ScrollTop