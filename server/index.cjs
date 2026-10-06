const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    status: "online",
    message: "NEXORA AI backend is running"
  });
});

app.listen(PORT, () => {
  console.log(`NEXORA backend running on http://localhost:${PORT}`);
});