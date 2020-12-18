/**** Node.js libraries *****/
const path = require('path');

/**** External libraries ****/
const express = require('express'); 
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const checkJwt = require("express-jwt"); 

/**** Configuration ****/
const app = express(); 
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost/moviedatabase'; 

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('combined')); 
app.use(cors());
app.use(express.static(path.resolve('..', 'client', 'build'))); 

const openPaths = [
  { url: "/api/users/authenticate", methods: ["POST"] },
  // Open everything withoit this
  /^(?!\/api\/AddReview).*/gim,

  // Let everyone see this
  { url: /\/api\/movies\.*/gim, methods: ["GET"] }
];


const secret = process.env.SECRET || "Mucho gracis";


app.use(checkJwt({ secret, algorithms: ['AB123'] }).unless({ path: openPaths }));



async function createServer() {
  await mongoose.connect(MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true});

  const MovieDB = require("./MovieDB")(mongoose);
  await MovieDB.movieTitles();

  const routes = require("./routes")(MovieDB);
  const loginRouter = require("./loginRouter")(secret);

  app.use(bodyParser.json()); 
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(morgan('combined')); 
  app.use(cors());
  app.use(express.static(path.resolve('..', 'client', 'build'))); 
  
  /**** Add routes ****/
  app.use("/api", routes);
  app.use("/api/users", loginRouter);

  // "Redirect" all non-API GET requests to React's entry point (index.html)
  app.get('*', (req, res) =>
    res.sendFile(path.resolve('..', 'client', 'build', 'index.html'))
  );
  
  return app;
}

module.exports = createServer;