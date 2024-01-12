const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5007;

connectDb()
app.use(express.json()) 
app.use("/api/contacts", require("./routes/contactRoutes")); //This is the middleware
app.use("/api/users", require("./routes/userRoutes")); //This is the middleware
app.use(errorHandler) 

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
