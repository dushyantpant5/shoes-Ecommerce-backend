const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

const bodyParser = require('body-parser');
require('dotenv').config()
const express = require("express");
const app = express();
const port = 3300;

const stripe = require("./routes/stripe_payment")

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use('/api/stripe',stripe)

app.get('/',(req,res)=>{
  res.send("Welcome to backend")
})

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
