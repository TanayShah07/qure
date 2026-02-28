const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div
      style={{
        textAlign: "center",
        padding: "20px",
        backgroundColor: "#0f172a",
        borderTop: "1px solid #334155",
        color: "#94a3b8",
        fontSize: "14px",
      }}
    >
      © {year} QURE – Quantum Unified RSA & Encryption. All Rights Reserved.
    </div>
  );
};

export default Footer;