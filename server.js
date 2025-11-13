const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());  // <-- FIXED!
app.use(express.json());

// routes
const pdfRoutes = require("./routes/pdfRoutes");
app.use("/api/pdf", pdfRoutes);

app.get("/", (req, res) => {
  res.send("BTEUP Backend Running");
});

app.listen(process.env.PORT || 3000, () =>
  console.log("Server running")
);
