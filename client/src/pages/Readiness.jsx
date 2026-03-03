import { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Readiness = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: "white" }
      }
    },
    scales: {
      x: {
        ticks: { color: "white" },
        grid: { color: "#334155" }
      },
      y: {
        ticks: { color: "white" },
        grid: { color: "#334155" }
      }
    }
  };

  const wrapperStyle = {
    minHeight: "100vh",
    width: "100vw",
    backgroundColor: "#0f172a",
    color: "white",
    padding: "60px 0"
  };

  const contentStyle = {
    width: "100%",
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "0 40px"
  };

  const sectionStyle = {
    marginBottom: "90px"
  };

  const chartBox = {
    width: "100%",
    maxWidth: "750px",
    height: "300px",
    margin: "20px auto"
  };

  const dropdownButton = {
    display: "block",
    margin: "20px auto 0 auto",
    padding: "10px 22px",
    borderRadius: "8px",
    border: "1px solid #334155",
    background: "#1e293b",
    color: "white",
    cursor: "pointer",
    fontWeight: "500"
  };

  const explanationStyle = {
    marginTop: "20px",
    padding: "18px",
    background: "linear-gradient(145deg,#1e293b,#111827)",
    borderRadius: "12px",
    lineHeight: "1.7",
    border: "1px solid #334155"
  };

  const graphs = [
    {
      id: "key",
      title: "1. Key Size Comparison",
      data: {
        labels: ["RSA", "Kyber"],
        datasets: [
          {
            label: "Key Size (bits)",
            data: [3072, 9472],
            backgroundColor: ["#38bdf8", "#22c55e"]
          }
        ]
      },
      text: "RSA uses integer factorization and typically smaller keys compared to Kyber. Kyber requires larger key sizes due to lattice-based structures but provides quantum resistance."
    },
    {
      id: "compute",
      title: "2. Computation Time Comparison",
      data: {
        labels: ["RSA", "Kyber"],
        datasets: [
          {
            label: "Computation Time (Relative Units)",
            data: [8, 3],
            backgroundColor: ["#facc15", "#22c55e"]
          }
        ]
      },
      text: "RSA relies on modular exponentiation with large integers, making it computationally heavier. Kyber uses structured polynomial arithmetic which is generally more efficient."
    },
    {
      id: "space",
      title: "3. Ciphertext Size Comparison",
      data: {
        labels: ["RSA", "Kyber"],
        datasets: [
          {
            label: "Ciphertext Size (Bytes)",
            data: [256, 1088],
            backgroundColor: ["#ef4444", "#22c55e"]
          }
        ]
      },
      text: "Kyber produces larger ciphertexts due to lattice noise components. RSA ciphertext size depends primarily on modulus size."
    },
    {
      id: "power",
      title: "4. Power Consumption Comparison",
      data: {
        labels: ["RSA", "Kyber"],
        datasets: [
          {
            label: "Power Consumption (Relative Units)",
            data: [9, 4],
            backgroundColor: ["#a855f7", "#22c55e"]
          }
        ]
      },
      text: "RSA consumes more energy due to heavy integer arithmetic. Kyber’s operations are generally more energy-efficient."
    }
  ];

  return (
    <div style={wrapperStyle}>
      <div style={contentStyle}>
        <h1 style={{ textAlign: "center", marginBottom: "70px" }}>
          Cryptographic Readiness Analysis
        </h1>

        {graphs.map((graph) => (
          <div key={graph.id} style={sectionStyle}>
            <h2 style={{ textAlign: "center" }}>{graph.title}</h2>

            <div style={chartBox}>
              <Bar data={graph.data} options={chartOptions} />
            </div>

            <button
              onClick={() => toggleSection(graph.id)}
              style={dropdownButton}
            >
              {openSection === graph.id
                ? "▲ Hide Explanation"
                : "▼ Explain Graph"}
            </button>

            {openSection === graph.id && (
              <div style={explanationStyle}>{graph.text}</div>
            )}
          </div>
        ))}

        <h2 style={{ textAlign: "center", marginTop: "70px", marginBottom: "20px" }}>
          Security Resistance Comparison
        </h2>

        <p style={{ textAlign: "center", marginBottom: "20px" }}>
          ✔ = Vulnerable &nbsp;&nbsp; ❌ = Not Vulnerable &nbsp;&nbsp; — = Not Applicable
        </p>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            backgroundColor: "#1e293b"
          }}
        >
          <thead>
            <tr>
              <th style={{ padding: "15px", border: "1px solid #334155" }}>Attack Type</th>
              <th style={{ padding: "15px", border: "1px solid #334155" }}>RSA</th>
              <th style={{ padding: "15px", border: "1px solid #334155" }}>Kyber</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={{ padding: "15px", border: "1px solid #334155" }}>Integer Factorization</td><td style={{ padding: "15px", border: "1px solid #334155" }}>✔</td><td style={{ padding: "15px", border: "1px solid #334155" }}>—</td></tr>
            <tr><td style={{ padding: "15px", border: "1px solid #334155" }}>Shor’s Quantum Algorithm</td><td style={{ padding: "15px", border: "1px solid #334155" }}>✔</td><td style={{ padding: "15px", border: "1px solid #334155" }}>❌</td></tr>
            <tr><td style={{ padding: "15px", border: "1px solid #334155" }}>Brute Force</td><td style={{ padding: "15px", border: "1px solid #334155" }}>❌</td><td style={{ padding: "15px", border: "1px solid #334155" }}>❌</td></tr>
            <tr><td style={{ padding: "15px", border: "1px solid #334155" }}>Chosen Ciphertext</td><td style={{ padding: "15px", border: "1px solid #334155" }}>✔</td><td style={{ padding: "15px", border: "1px solid #334155" }}>❌</td></tr>
            <tr><td style={{ padding: "15px", border: "1px solid #334155" }}>Chosen Plaintext</td><td style={{ padding: "15px", border: "1px solid #334155" }}>✔</td><td style={{ padding: "15px", border: "1px solid #334155" }}>❌</td></tr>
            <tr><td style={{ padding: "15px", border: "1px solid #334155" }}>Side Channel Attack</td><td style={{ padding: "15px", border: "1px solid #334155" }}>✔</td><td style={{ padding: "15px", border: "1px solid #334155" }}>✔</td></tr>
            <tr><td style={{ padding: "15px", border: "1px solid #334155" }}>Timing Attack</td><td style={{ padding: "15px", border: "1px solid #334155" }}>✔</td><td style={{ padding: "15px", border: "1px solid #334155" }}>✔</td></tr>
            <tr><td style={{ padding: "15px", border: "1px solid #334155" }}>Power Analysis</td><td style={{ padding: "15px", border: "1px solid #334155" }}>✔</td><td style={{ padding: "15px", border: "1px solid #334155" }}>✔</td></tr>
            <tr><td style={{ padding: "15px", border: "1px solid #334155" }}>Lattice Reduction (BKZ/LLL)</td><td style={{ padding: "15px", border: "1px solid #334155" }}>—</td><td style={{ padding: "15px", border: "1px solid #334155" }}>✔</td></tr>
            <tr><td style={{ padding: "15px", border: "1px solid #334155" }}>Grover’s Algorithm</td><td style={{ padding: "15px", border: "1px solid #334155" }}>—</td><td style={{ padding: "15px", border: "1px solid #334155" }}>—</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Readiness;