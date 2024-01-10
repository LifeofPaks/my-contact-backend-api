const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5007;

app.use(express.json()) //Body parser inbuild middleware
app.use("/api/contacts", require("./routes/contactRoutes")); //This is the middleware
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
