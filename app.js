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
const port = process.env.PORT || 3300;

const stripe = require("./routes/stripe_payment")

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use('/api/stripe',stripe)

app.get('/',(req,res)=>{
  res.send("Welcome to backend")
})

app.get('/test',(req,res)=>{
 res.send({url:'https://www.google.com/'});

})


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
