import { useState, useRef, useEffect } from "react"
import api from "../services/api"
import SecurityPanel from "../components/SecurityPanel"

const randomVector = () => [
Math.floor(Math.random()*5),
Math.floor(Math.random()*5)
]

const randomMatrix = () => [
[Math.floor(Math.random()*9)+1,Math.floor(Math.random()*9)+1],
[Math.floor(Math.random()*9)+1,Math.floor(Math.random()*9)+1]
]

const multiply = (A,v)=>[
A[0][0]*v[0]+A[0][1]*v[1],
A[1][0]*v[0]+A[1][1]*v[1]
]

const add=(a,b)=>[
a[0]+b[0],
a[1]+b[1]
]

const subtract=(a,b)=>[
a[0]-b[0],
a[1]-b[1]
]

const messageVector=(char)=>{
const code=char.charCodeAt(0)
return [code,0]
}

const kyberEncrypt=(text)=>{

const startEnc=performance.now()

const A=randomMatrix()
const s=randomVector()
const e=randomVector()

const As=multiply(A,s)
const b=add(As,e)

const encrypted=text.split("").map(char=>{

const m=messageVector(char)
const r=randomVector()

const u=multiply(A,r)
const br=multiply([[b[0],0],[0,b[1]]],r)
const v=add(br,m)

return {u,v,br}

})

const endEnc=performance.now()

const startDec=performance.now()

const decrypted=encrypted.map(item=>{
const recovered=subtract(item.v,item.br)
return String.fromCharCode(recovered[0])
}).join("")

const endDec=performance.now()

return{
cipher:encrypted.map(e=>({u:e.u,v:e.v})),
decrypted,
encTime:(endEnc-startEnc)/1000,
decTime:(endDec-startDec)/1000
}

}

const SecureDemo=()=>{

const [message,setMessage]=useState("")
const [messages,setMessages]=useState([])
const [loading,setLoading]=useState(false)
const [selectedMessage,setSelectedMessage]=useState(null)
const bottomRef=useRef(null)

useEffect(()=>{
bottomRef.current?.scrollIntoView({behavior:"smooth"})
},[messages])

const encryptMessage=async(text)=>{

const rsaResponse=await api.post("/encrypt",{message:text})
const kyber=kyberEncrypt(text)

return{
rsaCipher:rsaResponse.data.rsa.ciphertext,
rsaDecrypted:rsaResponse.data.rsa.decrypted,
encryptionTime:rsaResponse.data.rsa.encryptionTime,
decryptionTime:rsaResponse.data.rsa.decryptionTime,
kyberCipher:kyber.cipher,
kyberDecrypted:kyber.decrypted,
kyberEncTime:kyber.encTime,
kyberDecTime:kyber.decTime
}

}

const generateReply=(text)=>{

const lower=text.toLowerCase()

if(lower.includes("hi")||lower.includes("hello"))
return "Hi 👋 How are you?"

if(lower.includes("how are you"))
return "I'm doing great! Secure and encrypted 😎"

if(lower.includes("bye"))
return "Goodbye! Stay quantum safe 🔐"

return "Message received and encrypted securely."

}

const handleSend=async()=>{

if(!message.trim()||loading) return

setLoading(true)

const userEncryption=await encryptMessage(message)

const userMessage={
sender:"user",
text:message,
...userEncryption
}

setMessages(prev=>[...prev,userMessage])

const replyText=generateReply(message)
const replyEncryption=await encryptMessage(replyText)

const systemMessage={
sender:"system",
text:replyText,
...replyEncryption
}

setMessages(prev=>[...prev,systemMessage])

setMessage("")
setLoading(false)

}

return(

<div style={{
width:"100%",
minHeight:"100vh",
background:"linear-gradient(135deg,#0f172a,#1e293b)",
display:"flex",
flexDirection:"column",
color:"white"
}}>

<div style={{
flex:1,
padding:"40px",
overflowY:"auto",
display:"flex",
flexDirection:"column",
gap:"25px"
}}>

{messages.map((msg,index)=>(

<div
key={index}
onClick={()=>setSelectedMessage(msg)}
style={{
alignSelf:msg.sender==="user"?"flex-end":"flex-start",
maxWidth:"65%",
display:"flex",
flexDirection:"column",
cursor:"pointer"
}}
>

<div style={{
background:msg.sender==="user"
?"linear-gradient(135deg,#3b82f6,#2563eb)"
:"rgba(30,41,59,0.6)",
padding:"12px 16px",
borderRadius:"16px",
fontSize:"15px"
}}>
{msg.text}
</div>

<div style={{
fontSize:"12px",
marginTop:"8px",
background:"rgba(30,41,59,0.6)",
padding:"10px",
borderRadius:"10px",
lineHeight:"1.5",
wordBreak:"break-all"
}}>

<div><strong>RSA Cipher:</strong> {JSON.stringify(msg.rsaCipher)}</div>
<div><strong>RSA Decrypted:</strong> {msg.rsaDecrypted}</div>
<div><strong>RSA Enc Time:</strong> {msg.encryptionTime?.toFixed(6)} sec</div>
<div><strong>RSA Dec Time:</strong> {msg.decryptionTime?.toFixed(6)} sec</div>

<div style={{marginTop:"6px"}}>
<strong>Kyber Cipher:</strong> {JSON.stringify(msg.kyberCipher)}
</div>

<div><strong>Kyber Decrypted:</strong> {msg.kyberDecrypted}</div>
<div><strong>Kyber Enc Time:</strong> {msg.kyberEncTime?.toFixed(6)} sec</div>
<div><strong>Kyber Dec Time:</strong> {msg.kyberDecTime?.toFixed(6)} sec</div>

</div>

</div>

))}

{loading && (
<div style={{fontStyle:"italic",opacity:0.7}}>
Encrypting...
</div>
)}

<div ref={bottomRef}></div>

</div>

<div style={{
padding:"20px",
display:"flex",
gap:"12px",
borderTop:"1px solid #334155",
background:"rgba(30,41,59,0.6)"
}}>

<input
type="text"
placeholder="Type secure message..."
value={message}
onChange={(e)=>setMessage(e.target.value)}
onKeyDown={(e)=>{
if(e.key==="Enter"&&!loading) handleSend()
}}
style={{
flex:1,
padding:"14px",
borderRadius:"10px",
border:"none",
background:"#1e293b",
color:"white",
fontSize:"14px"
}}
/>

<button
onClick={handleSend}
disabled={loading}
style={{
padding:"14px 24px",
borderRadius:"10px",
border:"none",
background:"#22c55e",
color:"black",
fontWeight:"bold",
cursor:"pointer"
}}
>
Send
</button>

</div>

{selectedMessage && (
<SecurityPanel
message={selectedMessage}
close={()=>setSelectedMessage(null)}
/>
)}

</div>

)

}

export default SecureDemo