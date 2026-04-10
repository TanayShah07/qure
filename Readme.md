# 🔐 QURE — Quantum Unified Resilient Encryption

## 📌 Overview

QURE (Quantum Unified Resilient Encryption) is an interactive educational platform that demonstrates the transition from classical cryptography to post-quantum cryptography.

It provides hands-on simulations, secure communication, attack modeling, and graphical comparisons to help users understand how encryption works today and how it will evolve in the quantum era.

---

## 🚀 Features

### 🔑 Cryptographic Simulations

* **RSA (Classical Encryption)**

  * Key generation using prime numbers
  * Encryption & decryption process
  * Mathematical workflow visualization

* **CRYSTALS-Kyber (Post-Quantum Encryption)**

  * Lattice-based cryptography simulation
  * Matrix-vector operations
  * Quantum-resistant encryption model

---

### 💬 Secure Chat System

* Real-time encrypted messaging interface
* Messages encrypted before transmission
* Decryption at receiver side
* Demonstrates practical use of encryption

---

### ⚔️ Attack Simulator

* Simulates different attack types:

  * Brute Force Attack
  * Quantum Attack (Shor’s Algorithm)
  * Lattice Reduction Attacks
* Displays:

  * Time to break encryption
  * Whether attack is feasible or not
  * Reasoning behind security

---

### 📊 Graphical Analysis

* Comparison between RSA and Kyber:

  * Key Size
  * Computation Time
  * Ciphertext Size
  * Power Consumption

---

### 🧠 Security Readiness Module

* Table of cryptographic attacks
* Hover/Info-based explanations
* Shows:

  * Attack definition
  * Relevance to RSA and Kyber
  * Vulnerability comparison

---

## 🎯 Objective

* Explain how encryption secures digital communication
* Demonstrate limitations of classical cryptography
* Highlight the impact of quantum computing
* Introduce post-quantum cryptographic solutions

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Tailwind CSS / Inline Styling
* Chart.js

### Backend

* Node.js
* Express.js

### Cryptography Engine

* RSA (Number Theory)
* Kyber (Lattice-Based Cryptography)

---

## 🧪 How It Works

1. User selects an algorithm (RSA / Kyber)
2. Keys are generated
3. Message is encrypted
4. Ciphertext is produced
5. Decryption retrieves original message
6. Attack simulations test security

---

## ⚠️ Why QURE Matters

* RSA relies on integer factorization, which is vulnerable to quantum computers
* Quantum algorithms like **Shor’s Algorithm** can break RSA efficiently
* Kyber provides **quantum-resistant encryption** based on lattice problems

---

## 🖥️ Installation & Setup

```bash
git clone https://github.com/your-username/qure.git
cd qure
npm install
npm start
```

---

## 📸 Screens (Optional)

* Overview Page
* Simulation Module
* Secure Chat
* Attack Simulator
* Graph Analysis

---

## 🔮 Future Scope

* Integration with real-world APIs
* Support for more post-quantum algorithms
* Enhanced visualization and animations
* Deployment as a learning platform

---

## 👨‍💻 Author

**Tanay Shah**
B.Tech Computer Engineering

---

## 📄 License

This project is for educational purposes.
