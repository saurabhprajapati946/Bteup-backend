const express = require("express");
const routes = require("./routes/pdfRoutes");
const app = express();
app.use(express.json());
app.get("/", (req,res)=>res.send("BTEUP Backend Running"));
app.use("/api/pdf", routes);
app.listen(process.env.PORT||3000);