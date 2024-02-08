require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 3000;
const authRoute = require("./router/auth-route");
const contactRoute = require("./router/contact-route");
const connectDB = require("./utils/db");
const errorHandler = require("./middlewares/errorHandler");

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);

app.use(errorHandler);
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
});
