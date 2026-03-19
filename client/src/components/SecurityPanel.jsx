import React from "react"
import AttackSimulator from "./AttackSimulator"

const calculateBruteforce = (keySize) => {
const attempts = Math.pow(2, keySize)
const seconds = attempts / 1000000000000
const years = seconds / (60 * 60 * 24 * 365)
return years.toExponential(2)
}

const SecurityPanel = ({message, close}) => {

const rsaKeySize = 2048
const kyberKeySize = 256

const rsaCrackTime = calculateBruteforce(rsaKeySize)
const kyberCrackTime = calculateBruteforce(kyberKeySize)

return(

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
background:"#1e293b",
padding:"35px",
borderRadius:"12px",
width:"900px",
color:"white",
maxHeight:"85vh",
overflowY:"auto"
}}>

<div style={{display:"flex",justifyContent:"space-between",marginBottom:"20px"}}>

<h2>Security Analysis</h2>

<button
onClick={close}
style={{background:"#ef4444",border:"none",padding:"6px 12px",borderRadius:"6px",color:"white"}}
>
Close
</button>

</div>

<div style={{marginBottom:"25px"}}>
<b>Message:</b> {message.text}
</div>

<h3>RSA Security</h3>

<div>Cipher: {JSON.stringify(message.rsaCipher)}</div>
<div>Encryption Time: {message.encryptionTime} sec</div>
<div>Decryption Time: {message.decryptionTime} sec</div>
<div>Brute Force Time: 10^{rsaCrackTime} years</div>

<hr style={{margin:"25px 0"}}/>

<h3>Kyber Security</h3>

<div>Cipher: {JSON.stringify(message.kyberCipher)}</div>
<div>Encryption Time: {message.kyberEncTime} sec</div>
<div>Decryption Time: {message.kyberDecTime} sec</div>
<div>Lattice Attack Time: 10^{kyberCrackTime} years</div>

<hr style={{margin:"25px 0"}}/>

<AttackSimulator message={message}/>

</div>

</div>

)

}

export default SecurityPanel