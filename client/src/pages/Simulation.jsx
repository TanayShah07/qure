import { useState } from "react"

const gcd = (a, b) => {
  while (b !== 0n) {
    ;[a, b] = [b, a % b]
  }
  return a
}

const modInverse = (e, phi) => {
  let [old_r, r] = [phi, e]
  let [old_t, t] = [0n, 1n]

  while (r !== 0n) {
    const q = old_r / r
    ;[old_r, r] = [r, old_r - q * r]
    ;[old_t, t] = [t, old_t - q * t]
  }

  return (old_t % phi + phi) % phi
}

const modPow = (base, exponent, mod) => {
  let result = 1n
  base %= mod

  while (exponent > 0n) {
    if (exponent % 2n === 1n) result = (result * base) % mod
    exponent /= 2n
    base = (base * base) % mod
  }

  return result
}

const randomMatrix = () => [
  [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)],
  [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)]
]

const randomVector = () => [
  Math.floor(Math.random() * 5),
  Math.floor(Math.random() * 5)
]

const matrixVectorMultiply = (A, v) => [
  A[0][0] * v[0] + A[0][1] * v[1],
  A[1][0] * v[0] + A[1][1] * v[1]
]

const vectorAdd = (a, b) => [
  a[0] + b[0],
  a[1] + b[1]
]

const renderVector = (v) => (
  <div style={{ display: "inline-block", marginLeft: "10px" }}>
    {v.map((val, i) => (
      <div key={i} style={{ padding: "4px 14px", borderLeft: "2px solid white", borderRight: "2px solid white", textAlign: "center" }}>
        {val}
      </div>
    ))}
  </div>
)

const renderMatrix = (m) => (
  <div style={{ display: "inline-block", marginLeft: "10px" }}>
    {m.map((row, i) => (
      <div key={i} style={{ display: "flex", justifyContent: "center", borderLeft: "2px solid white", borderRight: "2px solid white", padding: "4px 12px" }}>
        {row.map((val, j) => (
          <div key={j} style={{ width: "25px", textAlign: "center" }}>{val}</div>
        ))}
      </div>
    ))}
  </div>
)

const Simulation = () => {

const [algorithm,setAlgorithm] = useState("rsa")

const [p,setP] = useState("")
const [q,setQ] = useState("")
const [n,setN] = useState(null)
const [phi,setPhi] = useState(null)
const [e,setE] = useState(null)
const [d,setD] = useState(null)
const [message,setMessage] = useState("")
const [cipher,setCipher] = useState(null)
const [plain,setPlain] = useState(null)

const [A,setA] = useState(null)
const [s,setS] = useState(null)
const [err,setErr] = useState(null)
const [b,setB] = useState(null)
const [kyberCipher,setKyberCipher] = useState(null)
const [kyberPlain,setKyberPlain] = useState(null)
const [kyberMessage,setKyberMessage] = useState("")
const [messageVector,setMessageVector] = useState(null)

const handleReset = () => {
setAlgorithm("rsa")
setP("")
setQ("")
setN(null)
setPhi(null)
setE(null)
setD(null)
setMessage("")
setCipher(null)
setPlain(null)
setA(null)
setS(null)
setErr(null)
setB(null)
setKyberCipher(null)
setKyberPlain(null)
setKyberMessage("")
setMessageVector(null)
}

const generateRSA = () => {
const P = BigInt(p)
const Q = BigInt(q)
if (P <= 1n || Q <= 1n) return

const N = P * Q
const PHI = (P - 1n) * (Q - 1n)
const E = 65537n

if (gcd(E, PHI) !== 1n) return

const D = modInverse(E, PHI)

setN(N)
setPhi(PHI)
setE(E)
setD(D)
setCipher(null)
setPlain(null)
}

const encryptRSA = () => {
if (!message || !e || !n) return

const encrypted = message.split("").map((char) =>
modPow(BigInt(char.charCodeAt(0)), e, n)
)

setCipher(encrypted)
}

const decryptRSA = () => {
if (!cipher || !d || !n) return

const decrypted = cipher
.map((num) => String.fromCharCode(Number(modPow(num, d, n))))
.join("")

setPlain(decrypted)
}

const generateKyber = () => {
const A_matrix = randomMatrix()
const secret = randomVector()
const error = randomVector()

const As = matrixVectorMultiply(A_matrix, secret)
const b_vector = vectorAdd(As, error)

setA(A_matrix)
setS(secret)
setErr(error)
setB(b_vector)
setKyberCipher(null)
setKyberPlain(null)
}

const createMessageVector = (text) => {
if (!text) return [0, 0]
const code = text.charCodeAt(0)
return [code % 10, Math.floor(code / 10) % 10]
}

const encryptKyber = () => {
if (!b) return

const m = createMessageVector(kyberMessage)
setMessageVector(m)

const r = randomVector()
const u = matrixVectorMultiply(A, r)
const br = matrixVectorMultiply([[b[0], 0], [0, b[1]]], r)
const v = vectorAdd(br, m)

setKyberCipher({ r, u, v })
}

const decryptKyber = () => {
if (!kyberCipher || !s) return

const recovered = [
kyberCipher.v[0] - s[0] * kyberCipher.u[0],
kyberCipher.v[1] - s[1] * kyberCipher.u[1]
]

setKyberPlain({
vector: recovered,
message: kyberMessage
})
}

const encryptStyle = {
padding:"12px 26px",
borderRadius:"10px",
border:"none",
background:"#22c55e",
color:"white",
fontWeight:"600",
cursor:"pointer"
}

const decryptStyle = {
padding:"12px 26px",
borderRadius:"10px",
border:"none",
background:"#facc15",
color:"black",
fontWeight:"600",
cursor:"pointer"
}

return (

<div style={{
minHeight:"100vh",
width:"100%",
display:"flex",
flexDirection:"column",
alignItems:"center",
padding:"140px 20px 60px 20px",
background:"linear-gradient(135deg,#0f172a,#1e293b)",
color:"white",
position:"relative"
}}>

<button onClick={handleReset} style={{
position:"absolute",
top:"120px",
right:"60px",
padding:"10px 20px",
borderRadius:"10px",
background:"#ef4444",
color:"white",
border:"none",
fontWeight:"600",
cursor:"pointer"
}}>
Reset
</button>

<select value={algorithm} onChange={(e)=>setAlgorithm(e.target.value)} style={{
padding:"12px 20px",
borderRadius:"10px",
background:"#1e293b",
color:"white",
border:"1px solid #334155",
marginBottom:"40px"
}}>
<option value="rsa">RSA</option>
<option value="kyber">Kyber</option>
</select>

{algorithm==="rsa" && (
<div style={{
width:"100%",
maxWidth:"900px",
padding:"40px",
borderRadius:"20px",
background:"rgba(30,41,59,0.6)",
backdropFilter:"blur(10px)",
boxShadow:"0 10px 40px rgba(0,0,0,0.5)"
}}>

<div style={{ display:"flex", gap:"15px", marginBottom:"25px" }}>
<input type="number" placeholder="Enter p" value={p} onChange={(e)=>setP(e.target.value)} style={{ padding:"12px", borderRadius:"10px", flex:1 }} />
<input type="number" placeholder="Enter q" value={q} onChange={(e)=>setQ(e.target.value)} style={{ padding:"12px", borderRadius:"10px", flex:1 }} />
<button onClick={generateRSA} style={{ padding:"12px 20px", borderRadius:"10px", background:"#38bdf8", border:"none", fontWeight:"600", cursor:"pointer" }}>Generate</button>
</div>

{n && (
<div>
<div>n = {n.toString()}</div>
<div>φ(n) = {phi.toString()}</div>
<div>e = {e.toString()}</div>
<div>d = {d.toString()}</div>

<div style={{ display:"flex", gap:"15px", marginTop:"20px" }}>
<input value={message} onChange={(e)=>setMessage(e.target.value)} style={{ flex:2, padding:"12px", borderRadius:"10px" }} />
<button onClick={encryptRSA} style={encryptStyle}>Encrypt</button>
<button onClick={decryptRSA} style={decryptStyle}>Decrypt</button>
</div>

{cipher && <div style={{ marginTop:"20px" }}>{cipher.map(c=>c.toString()).join(", ")}</div>}
{plain && <div style={{ marginTop:"15px" }}>{plain}</div>}
</div>
)}

</div>
)}

{algorithm==="kyber" && (
<div style={{
width:"100%",
maxWidth:"900px",
padding:"40px",
borderRadius:"20px",
background:"rgba(30,41,59,0.6)",
backdropFilter:"blur(10px)",
boxShadow:"0 10px 40px rgba(0,0,0,0.5)"
}}>

<button
onClick={generateKyber}
style={{
padding:"14px 28px",
borderRadius:"12px",
border:"none",
background:"linear-gradient(135deg, #38bdf8, #0ea5e9)",
color:"#020617",
fontWeight:"600",
fontSize:"15px",
cursor:"pointer",
boxShadow:"0 6px 20px rgba(56,189,248,0.4)",
transition:"all 0.25s ease",
letterSpacing:"0.5px"
}}
onMouseEnter={(e)=>{
e.target.style.transform = "scale(1.05)"
e.target.style.boxShadow = "0 10px 30px rgba(56,189,248,0.6)"
}}
onMouseLeave={(e)=>{
e.target.style.transform = "scale(1)"
e.target.style.boxShadow = "0 6px 20px rgba(56,189,248,0.4)"
}}
>
Generate Keys
</button>

{A && (
<div>
<div>A = {renderMatrix(A)}</div>
<div>s = {renderVector(s)}</div>
<div>e = {renderVector(err)}</div>
<div>b = {renderVector(b)}</div>

<div style={{ display:"flex", gap:"15px", marginTop:"20px" }}>
<input value={kyberMessage} onChange={(e)=>setKyberMessage(e.target.value)} style={{ padding:"10px" }} />
<button onClick={encryptKyber} style={encryptStyle}>Encrypt</button>
<button onClick={decryptKyber} style={decryptStyle}>Decrypt</button>
</div>

{messageVector && <div style={{ marginTop:"20px" }}>{renderVector(messageVector)}</div>}

{kyberCipher && (
<div style={{ marginTop:"20px" }}>
<div>r = {renderVector(kyberCipher.r)}</div>
<div>u = {renderVector(kyberCipher.u)}</div>
<div>v = {renderVector(kyberCipher.v)}</div>
</div>
)}

{kyberPlain && (
<div style={{ marginTop:"20px" }}>
<div>{renderVector(kyberPlain.vector)}</div>
<div>{kyberPlain.message}</div>
</div>
)}

</div>
)}

</div>
)}

</div>

)

}

export default Simulation