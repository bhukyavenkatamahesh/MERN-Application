require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 3000;
const router = require("./router/auth-route");
const connectDB = require("./utils/db");

app.use(express.json());
app.use("/api/auth", router);

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
});
