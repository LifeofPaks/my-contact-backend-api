const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5007;

app.use(express.json()) //Body parser middleware
app.use("/api/contacts", require("./routes/contactRoutes")); //This is the middleware

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
