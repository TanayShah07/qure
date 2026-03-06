const Overview = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "60px 100px",
        background: "linear-gradient(135deg,#0f172a,#1e293b)",
        color: "white",
        lineHeight: "1.8"
      }}
    >
      <h1 style={{ fontSize: "42px", marginBottom: "40px" }}>
        QURE Platform Overview
      </h1>

      <h2 style={{ fontSize: "28px", marginTop: "40px" }}>
        1. What is QURE?
      </h2>

      <p>
        QURE stands for <strong>Quantum Unified Resilient Encryption</strong>.
        It is an educational cryptographic platform designed to demonstrate how
        secure communication can be achieved using both classical cryptographic
        algorithms and modern post-quantum cryptographic algorithms.
      </p>

      <p>
        The platform provides an interactive environment where users can
        explore how encryption works internally, how cryptographic keys are
        generated, and how secure communication protects sensitive information
        during digital transmission. Through simulations, secure chat
        demonstrations, and graphical comparisons, QURE bridges the gap between
        theoretical cryptography and practical implementation.
      </p>

      <p>
        With the rapid advancement of quantum computing, many classical
        cryptographic systems may become vulnerable in the future. QURE
        therefore introduces both classical encryption and quantum-resistant
        encryption so that users can understand how cryptography is evolving to
        address future security challenges.
      </p>

      <h2 style={{ fontSize: "28px", marginTop: "40px" }}>
        2. What the Platform Does
      </h2>

      <p>
        The QURE platform demonstrates how secure communication is established
        through encryption algorithms. Users interact with a secure messaging
        interface where messages are encrypted before transmission and
        decrypted at the receiver's side.
      </p>

      <p>
        The platform also includes algorithm simulations that visually explain
        how encryption systems function. Users can observe the complete
        workflow of encryption including key generation, encryption formulas,
        ciphertext generation, and message recovery.
      </p>

      <p>
        Additionally, the platform provides comparative analysis through
        graphical visualization. These comparisons allow users to evaluate
        cryptographic algorithms based on parameters such as key size,
        computational efficiency, space requirements, and resistance to
        various types of attacks.
      </p>

      <h2 style={{ fontSize: "28px", marginTop: "40px" }}>
        3. Goal of the Platform
      </h2>

      <p>
        The primary goal of QURE is to provide an educational platform that
        helps users understand how modern encryption protects digital
        communication.
      </p>

      <p>
        The platform aims to:
      </p>

      <ul>
        <li>Demonstrate how secure communication systems encrypt messages</li>
        <li>Visualize the internal working of encryption algorithms</li>
        <li>Compare classical and post-quantum cryptography</li>
        <li>Explain how encryption resists different types of cyber attacks</li>
        <li>Prepare users for the transition toward quantum-resistant security</li>
      </ul>

      <h2 style={{ fontSize: "28px", marginTop: "40px" }}>
        4. Algorithms Covered
      </h2>

      <p>The platform focuses on two major cryptographic algorithms:</p>

      <ul>
        <li>
          <strong>RSA (Rivest–Shamir–Adleman)</strong> – A classical public key
          cryptographic algorithm used widely in secure communication systems.
        </li>
        <li>
          <strong>CRYSTALS-Kyber</strong> – A post-quantum cryptographic
          algorithm designed to resist attacks from quantum computers.
        </li>
      </ul>

      <h2 style={{ fontSize: "28px", marginTop: "40px" }}>
        5. What is RSA?
      </h2>

      <p>
        RSA is a public key cryptographic algorithm introduced in 1977 by Ron
        Rivest, Adi Shamir, and Leonard Adleman. It is based on the
        computational difficulty of factoring large integers into their prime
        components.
      </p>

      <p>
        RSA uses two keys: a public key used for encryption and a private key
        used for decryption. The security of RSA depends on the difficulty of
        factoring the large integer n which is created by multiplying two large
        prime numbers.
      </p>

      <h3>Formulas Used in RSA</h3>

      <pre>
{`n = p × q

φ(n) = (p − 1)(q − 1)

Public Key = (e, n)
Private Key = (d, n)

Encryption:
C = M^e mod n

Decryption:
M = C^d mod n`}
      </pre>

      <h3>RSA Algorithm Steps</h3>

      <ol>
        <li>Select two large prime numbers p and q</li>
        <li>Compute n = p × q</li>
        <li>Compute φ(n) = (p − 1)(q − 1)</li>
        <li>Choose e such that gcd(e, φ(n)) = 1</li>
        <li>Compute d such that e × d mod φ(n) = 1</li>
        <li>Public key becomes (e,n)</li>
        <li>Private key becomes (d,n)</li>
        <li>Messages are encrypted using the public key</li>
        <li>Messages are decrypted using the private key</li>
      </ol>

      <h2 style={{ fontSize: "28px", marginTop: "40px" }}>
        6. Why RSA is Used in the Platform
      </h2>

      <p>
        RSA is used in the platform because it represents one of the most
        historically significant and widely implemented classical cryptographic
        algorithms. It forms the foundation of many modern security protocols
        such as HTTPS, SSL/TLS, and secure email encryption.
      </p>

      <p>
        By implementing RSA within the secure chat system of QURE, users can
        observe how traditional public-key encryption works in practice. This
        allows them to see how plaintext messages are transformed into
        ciphertext and how the original message is recovered using the private
        key.
      </p>

      <p>
        RSA also acts as a baseline for comparing classical encryption systems
        with post-quantum cryptographic algorithms. Understanding RSA helps
        users appreciate the strengths of traditional cryptography while also
        recognizing its potential vulnerabilities in the era of quantum
        computing.
      </p>

      <h2 style={{ fontSize: "28px", marginTop: "40px" }}>
        7. How RSA Helps the Platform
      </h2>

      <p>
        Within the platform, RSA enables secure communication by encrypting
        user messages before they are transmitted through the chat interface.
        This demonstrates how public-key cryptography ensures confidentiality
        in real-world communication systems.
      </p>

      <p>
        The RSA implementation also allows the platform to measure encryption
        time, decryption time, ciphertext generation, and computational
        complexity. These metrics are later used in graphical comparisons to
        evaluate algorithm performance.
      </p>

      <p>
        By integrating RSA into simulations and secure chat modules, the
        platform successfully demonstrates the real-world functioning of
        classical encryption systems.
      </p>

      <h2 style={{ fontSize: "28px", marginTop: "40px" }}>
        8. What is CRYSTALS-Kyber?
      </h2>

      <p>
        CRYSTALS-Kyber is a post-quantum cryptographic algorithm based on
        lattice cryptography. It was selected by the National Institute of
        Standards and Technology (NIST) as one of the official standards for
        post-quantum encryption.
      </p>

      <p>
        Kyber is based on the mathematical hardness of the Learning With Errors
        (LWE) problem. Unlike RSA, which relies on integer factorization,
        lattice problems are believed to remain difficult even for quantum
        computers.
      </p>

      <h3>Mathematical Representation</h3>

      <pre>
{`b = A·s + e

A = random matrix
s = secret vector
e = small error vector
b = public key`}
      </pre>

      <h3>Kyber Algorithm Steps</h3>

      <ol>
        <li>Generate random matrix A</li>
        <li>Generate secret vector s</li>
        <li>Generate small error vector e</li>
        <li>Compute b = A·s + e</li>
        <li>Public key becomes (A,b)</li>
        <li>Secret key is s</li>
        <li>Encryption encapsulates a shared secret</li>
        <li>Decryption decapsulates the shared secret</li>
      </ol>

      <h2 style={{ fontSize: "28px", marginTop: "40px" }}>
        9. Why Kyber is Used in the Platform
      </h2>

      <p>
        Kyber is used because it represents the next generation of cryptography
        designed specifically to resist quantum computer attacks. With the
        emergence of quantum computing technologies, classical algorithms such
        as RSA could eventually become vulnerable to algorithms like Shor’s
        algorithm.
      </p>

      <p>
        By integrating Kyber into the platform, QURE demonstrates how
        post-quantum cryptography will secure digital communication in the
        future. This helps users understand the importance of transitioning to
        quantum-resistant encryption systems.
      </p>

      <h2 style={{ fontSize: "28px", marginTop: "40px" }}>
        10. How Kyber Helps the Platform
      </h2>

      <p>
        Kyber allows the platform to demonstrate modern encryption systems that
        remain secure even against quantum computing attacks. Within the secure
        chat module, Kyber encrypts messages using lattice-based cryptography,
        showcasing how post-quantum encryption works in practice.
      </p>

      <p>
        By comparing Kyber with RSA through simulations and graphs, the
        platform highlights the evolution of cryptographic security and
        prepares users for the future of cybersecurity.
      </p>

      <h2 style={{ fontSize: "28px", marginTop: "40px" }}>
        11. Why RSA and Kyber Were Chosen
      </h2>

      <p>
        RSA and CRYSTALS-Kyber were chosen because they represent two important
        stages in the evolution of cryptography.
      </p>

      <p>
        RSA represents classical cryptography and has been widely used in
        secure communication systems for decades. It provides a clear example
        of how traditional encryption systems operate.
      </p>

      <p>
        Kyber represents modern post-quantum cryptography and has been selected
        by NIST as a future standard for quantum-resistant encryption.
      </p>

      <p>
        By comparing RSA and Kyber, the platform clearly demonstrates the
        transition from classical encryption systems to quantum-resistant
        encryption systems.
      </p>

      <h2 style={{ fontSize: "28px", marginTop: "40px" }}>
        12. Author
      </h2>

      <p>
        <strong>Tanay Shah</strong>
      </p>

      <p>
        Student – Third Year B.Tech in Computer Engineering
      </p>

      <p>
        NMIMS University
      </p>
    </div>
  );
};

export default Overview;