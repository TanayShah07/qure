import { useState, useRef, useEffect } from "react";
import api from "../services/api";

const SecureDemo = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const encryptMessage = async (text) => {
    const rsaResponse = await api.post("/encrypt", {
      message: text,
    });

    const latticeResponse = await api.post("/encrypt", {
      algorithm: "lattice",
      message: text,
    });

    return {
      rsaCipher: rsaResponse.data.rsa.ciphertext,
      rsaDecrypted: rsaResponse.data.rsa.decrypted,
      encryptionTime: rsaResponse.data.rsa.encryptionTime,
      decryptionTime: rsaResponse.data.rsa.decryptionTime,
      lattice: latticeResponse.data.encrypted,
    };
  };

  const generateReply = (text) => {
    const lower = text.toLowerCase();

    if (lower.includes("hi") || lower.includes("hello")) {
      return "Hi 👋 How are you?";
    }

    if (lower.includes("how are you")) {
      return "I'm doing great! Secure and encrypted 😎";
    }

    if (lower.includes("bye")) {
      return "Goodbye! Stay quantum safe 🔐";
    }

    return "Message received and encrypted securely.";
  };

  const handleSend = async () => {
    if (!message.trim() || loading) return;

    setLoading(true);

    const userEncryption = await encryptMessage(message);

    const userMessage = {
      sender: "user",
      text: message,
      ...userEncryption,
    };

    setMessages((prev) => [...prev, userMessage]);

    const replyText = generateReply(message);
    const replyEncryption = await encryptMessage(replyText);

    const systemMessage = {
      sender: "system",
      text: replyText,
      ...replyEncryption,
    };

    setMessages((prev) => [...prev, systemMessage]);

    setMessage("");
    setLoading(false);
  };

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#0f172a",
        color: "white",
      }}
    >
      <div
        style={{
          flex: 1,
          padding: "20px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "25px",
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
              maxWidth: "65%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                backgroundColor:
                  msg.sender === "user" ? "#2563eb" : "#1e293b",
                padding: "12px 16px",
                borderRadius: "16px",
                fontSize: "15px",
              }}
            >
              {msg.text}
            </div>

            <div
              style={{
                fontSize: "12px",
                opacity: 0.85,
                marginTop: "6px",
                lineHeight: "1.4",
                wordBreak: "break-all",
              }}
            >
              <div>
                <strong>RSA Cipher:</strong>{" "}
                {JSON.stringify(msg.rsaCipher)}
              </div>
              <div>
                <strong>RSA Decrypted:</strong> {msg.rsaDecrypted}
              </div>
              <div>
                <strong>Enc Time:</strong>{" "}
                {msg.encryptionTime?.toFixed(6)} sec
              </div>
              <div>
                <strong>Dec Time:</strong>{" "}
                {msg.decryptionTime?.toFixed(6)} sec
              </div>
              <div>
                <strong>Lattice:</strong> {msg.lattice}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div
            style={{
              alignSelf: "flex-start",
              fontStyle: "italic",
              opacity: 0.7,
            }}
          >
            Encrypting...
          </div>
        )}

        <div ref={bottomRef}></div>
      </div>

      <div
        style={{
          padding: "15px",
          display: "flex",
          gap: "10px",
          borderTop: "1px solid #334155",
        }}
      >
        <input
          type="text"
          placeholder="Type message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !loading) {
              handleSend();
            }
          }}
          style={{
            flex: 1,
            padding: "12px",
            borderRadius: "10px",
            border: "none",
            outline: "none",
            fontSize: "14px",
          }}
        />

        <button
          onClick={handleSend}
          disabled={loading}
          style={{
            padding: "12px 22px",
            borderRadius: "10px",
            border: "none",
            backgroundColor: "#22c55e",
            color: "black",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default SecureDemo;