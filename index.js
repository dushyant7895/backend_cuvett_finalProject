const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require('cors');

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log('Database connected successfully');
}).catch(err => {
  console.log('Database is not connected', err);
});

const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());


const forFolder = require("./routes/folderRouting");
const forUsers = require("./routes/userRouting");
const forResponse = require("./routes/responseRouting"); 
const forForm = require("./routes/formRouting");

app.use("/folder", forFolder);
app.use("/responses", forResponse); 
app.use("/user", forUsers);
app.use("/form", forForm);




app.listen(PORT, () => {
  console.log(`Server is running on port no ${PORT}`);
});


app.use("*", (req, res) => {
  res.status(500).json({
    message:"Page not found"
  });
});

app.get("/", (req, res) => {
  res.send("main page fetch");
});