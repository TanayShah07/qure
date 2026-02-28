import { NavLink } from "react-router-dom";
import logo from "../assets/logo.svg";

const Navbar = () => {
  const linkStyle = ({ isActive }) => ({
    color: isActive ? "#38bdf8" : "#e2e8f0",
    textDecoration: "none",
    fontWeight: isActive ? "600" : "400",
    borderBottom: isActive ? "2px solid #38bdf8" : "none",
    paddingBottom: "4px",
    transition: "all 0.2s ease",
  });

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 50px",
        background: "linear-gradient(90deg, #0f172a, #1e293b)",
        boxShadow: "0 2px 10px rgba(0,0,0,0.4)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <img src={logo} alt="QURE Logo" style={{ height: "32px" }} />
        <span style={{ fontSize: "20px", fontWeight: "bold", color: "#38bdf8" }}>
          QURE
        </span>
      </div>

      <div
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          color: "#e2e8f0",
          fontSize: "24px",
          letterSpacing: "0.5px",
          fontWeight: "500",
        }}
      >
        Quantum Unified Resilient Encryption
      </div>

      <div style={{ display: "flex", gap: "35px", fontSize: "15px" }}>
        <NavLink to="/" style={linkStyle}>
          Overview
        </NavLink>
        <NavLink to="/chat" style={linkStyle}>
          Secure Chat
        </NavLink>
        <NavLink to="/readiness" style={linkStyle}>
          Graphs
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;