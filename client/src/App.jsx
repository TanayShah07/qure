import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Overview from "./pages/Overview";
import SecureDemo from "./pages/SecureDemo";
import Readiness from "./pages/Readiness";
import Footer from "./components/Footer";
import Simulation from "./pages/Simulation";

function App() {
  return (
    <Router>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#0f172a",
        }}
      >
        <Navbar />

        <div style={{ flex: 1, display: "flex" }}>
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/chat" element={<SecureDemo />} />
            <Route path="/simulation" element={<Simulation />} />
            <Route path="/readiness" element={<Readiness />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;