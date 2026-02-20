const runPython = require("../services/pythonBridge");

const encryptMessage = async (req, res) => {
  try {
    const { algorithm, message } = req.body;
    let result;
    if(algorithm=="rsa"){
      result = await runPython(
        "../crypto-engine/classical/rsa_encrypt.py",
        [message]
      );
    }
    else{
      result = await runPython(
        "../crypto-engine/post_quantum/lattice_encrypt.py",
        [message]
      );
    }

    res.json({ encrypted: result });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

module.exports = { encryptMessage };