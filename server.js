const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5007;

connectDb()
app.use(express.json()) //Body parser inbuild middleware
app.use("/api/contacts", require("./routes/contactRoutes")); //This is the middleware
app.use(errorHandler) //Custom middleware

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
