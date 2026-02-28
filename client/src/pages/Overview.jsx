const Overview = () => {
  return (
    <div style={{ padding: "60px", color: "white", maxWidth: "1000px", margin: "auto" }}>

      <p style={{ lineHeight: "1.7", fontSize: "16px", opacity: 0.9 }}>
        QURE is a comparative cryptographic platform designed to evaluate
        classical RSA encryption against post-quantum lattice-based encryption
        (CRYSTALS-Kyber). As quantum computing advances, traditional public-key
        cryptography faces potential vulnerabilities. QURE demonstrates encryption
        workflows, performance differences, and readiness analysis in a unified system.
      </p>

      <div style={{ marginTop: "50px" }}>
        <h2>Problem Statement</h2>
        <p style={{ opacity: 0.9 }}>
          RSA relies on integer factorization, which is computationally secure
          today but vulnerable to Shor’s Algorithm in a large-scale quantum environment.
          This raises concerns about long-term cryptographic security.
        </p>
      </div>

      <div style={{ marginTop: "40px" }}>
        <h2>Proposed Solution</h2>
        <p style={{ opacity: 0.9 }}>
          CRYSTALS-Kyber, a lattice-based encryption scheme, is resistant to known
          quantum attacks. QURE enables side-by-side comparison of classical and
          post-quantum encryption techniques through real-time simulation.
        </p>
      </div>

      <div style={{ marginTop: "40px" }}>
        <h2>System Architecture</h2>
        <p style={{ opacity: 0.9 }}>
          React (Frontend) → Node + Express (Backend API) → Python Crypto Engine.
          The system dynamically executes RSA and lattice-based encryption algorithms
          and returns comparative results to the user interface.
        </p>
      </div>
    </div>
  );
};

export default Overview;