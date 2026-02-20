const express= require("express");
const cryptoRoutes= require("./routes/cryptoRoutes");
const app= express();
app.use(express.json());
app.use("/",cryptoRoutes);
module.exports=app;