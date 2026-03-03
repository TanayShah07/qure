const runPython = require("../services/pythonBridge");

let rsaKeys = null;

const initializeRSA = async () => {
  const result = await runPython(
    "../crypto-engine/classical/rsa_encrypt.py",
    ["keygen"]
  );
  rsaKeys = JSON.parse(result);
};

const encryptMessage = async (req, res) => {
  try {
    const { message } = req.body;

    if (!rsaKeys) {
      await initializeRSA();
    }

    const publicKey = rsaKeys.public.join(",");

    // 🔐 Encrypt
    const encrypted = await runPython(
      "../crypto-engine/classical/rsa_encrypt.py",
      ["encrypt", publicKey, message]
    );

    const encryptedObj = JSON.parse(encrypted);

    // 🔓 Decrypt
    const decrypted = await runPython(
      "../crypto-engine/classical/rsa_encrypt.py",
      [
        "decrypt",
        rsaKeys.private.join(","),
        JSON.stringify(encryptedObj.ciphertext),
      ]
    );

    const decryptedObj = JSON.parse(decrypted);

    res.json({
      rsa: {
        ciphertext: encryptedObj.ciphertext,
        decrypted: decryptedObj.plaintext,
        encryptionTime: encryptedObj.time,
        decryptionTime: decryptedObj.time,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

module.exports = { encryptMessage };