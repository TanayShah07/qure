const express= require("express");
const cors = require("cors");
const cryptoRoutes= require("./routes/cryptoRoutes");
const app= express();
app.use(express.json());
app.use(cors());
app.use("/",cryptoRoutes);
module.exports=app;