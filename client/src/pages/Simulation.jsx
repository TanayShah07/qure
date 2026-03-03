import { useState } from "react";

const gcd = (a, b) => {
  while (b !== 0n) {
    [a, b] = [b, a % b];
  }
  return a;
};

const modInverse = (e, phi) => {
  let [old_r, r] = [phi, e];
  let [old_t, t] = [0n, 1n];

  while (r !== 0n) {
    const quotient = old_r / r;
    [old_r, r] = [r, old_r - quotient * r];
    [old_t, t] = [t, old_t - quotient * t];
  }

  return (old_t % phi + phi) % phi;
};

const modPow = (base, exponent, mod) => {
  let result = 1n;
  base %= mod;

  while (exponent > 0n) {
    if (exponent % 2n === 1n) result = (result * base) % mod;
    exponent /= 2n;
    base = (base * base) % mod;
  }

  return result;
};

const Simulation = () => {
  const [algorithm, setAlgorithm] = useState("rsa");
  const [p, setP] = useState("");
  const [q, setQ] = useState("");
  const [n, setN] = useState(null);
  const [phi, setPhi] = useState(null);
  const [e, setE] = useState(null);
  const [d, setD] = useState(null);
  const [message, setMessage] = useState("");
  const [cipher, setCipher] = useState(null);
  const [plain, setPlain] = useState(null);

  const generateRSA = () => {
    const P = BigInt(p);
    const Q = BigInt(q);
    if (P <= 1n || Q <= 1n) return;

    const N = P * Q;
    const PHI = (P - 1n) * (Q - 1n);
    const E = 65537n;

    if (gcd(E, PHI) !== 1n) return;

    const D = modInverse(E, PHI);

    setN(N);
    setPhi(PHI);
    setE(E);
    setD(D);
    setCipher(null);
    setPlain(null);
  };

  const encrypt = () => {
    if (!message || !e || !n) return;
    const encrypted = message.split("").map((char) =>
      modPow(BigInt(char.charCodeAt(0)), e, n)
    );
    setCipher(encrypted);
    setPlain(null);
  };

  const decrypt = () => {
    if (!cipher || !d || !n) return;
    const decrypted = cipher
      .map((num) => String.fromCharCode(Number(modPow(num, d, n))))
      .join("");
    setPlain(decrypted);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        padding: "60px",
        boxSizing: "border-box",
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
        color: "white"
      }}
    >
      <h1 style={{ fontSize: "40px", marginBottom: "50px" }}>
        Algorithm Simulation
      </h1>

      <div style={{ marginBottom: "40px" }}>
        <select
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
          style={{
            padding: "12px 20px",
            borderRadius: "10px",
            backgroundColor: "#1e293b",
            color: "white",
            border: "1px solid #334155",
            fontSize: "16px"
          }}
        >
          <option value="rsa">RSA</option>
          <option value="kyber">Kyber (Lattice)</option>
        </select>
      </div>

      {algorithm === "rsa" && (
        <div
          style={{
            width: "100%",
            padding: "50px",
            borderRadius: "20px",
            background: "rgba(30,41,59,0.6)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 10px 40px rgba(0,0,0,0.5)"
          }}
        >
          <h2 style={{ marginBottom: "30px" }}>
            RSA Step-by-Step Simulation
          </h2>

          <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
            <input
              type="number"
              placeholder="Enter p"
              value={p}
              onChange={(e) => setP(e.target.value)}
              style={{ padding: "12px", borderRadius: "10px", flex: 1 }}
            />
            <input
              type="number"
              placeholder="Enter q"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              style={{ padding: "12px", borderRadius: "10px", flex: 1 }}
            />
            <button
              onClick={generateRSA}
              style={{
                padding: "12px 24px",
                borderRadius: "10px",
                backgroundColor: "#38bdf8",
                border: "none",
                fontWeight: "600"
              }}
            >
              Generate Keys
            </button>
          </div>

          {n && (
            <>
              <div style={{ lineHeight: "2" }}>
                <div>n = {n.toString()}</div>
                <div>φ(n) = {phi.toString()}</div>
                <div>e = {e.toString()}</div>
                <div>d = {d.toString()}</div>
              </div>

              <div style={{ display: "flex", gap: "20px", marginTop: "40px" }}>
                <input
                  type="text"
                  placeholder="Enter message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{ flex: 2, padding: "12px", borderRadius: "10px" }}
                />
                <button
                  onClick={encrypt}
                  style={{
                    padding: "12px 24px",
                    borderRadius: "10px",
                    backgroundColor: "#22c55e",
                    border: "none"
                  }}
                >
                  Encrypt
                </button>
                <button
                  onClick={decrypt}
                  style={{
                    padding: "12px 24px",
                    borderRadius: "10px",
                    backgroundColor: "#facc15",
                    border: "none"
                  }}
                >
                  Decrypt
                </button>
              </div>

              {cipher && (
                <div style={{ marginTop: "30px" }}>
                  <strong>Ciphertext:</strong>{" "}
                  {cipher.map((c) => c.toString()).join(", ")}
                </div>
              )}

              {plain && (
                <div style={{ marginTop: "20px" }}>
                  <strong>Decrypted Message:</strong> {plain}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Simulation;