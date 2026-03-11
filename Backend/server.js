require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const blogRoutes = require("./routes/blog");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/blog", blogRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});