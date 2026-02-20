const express= require("express");
const router = express.Router();
const { encryptMessage } = require("../controllers/cryptoController");

router.get("/test", (req,res)=>{
    res.json({message: "Express Server running"
    })
});

router.post("/encrypt", encryptMessage);

module.exports=router;