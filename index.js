const http = require("http");
const express = require("express");
const routes = require("./src/routes");
var middleware = require("./src/middleware/checkAuth");
const bodyParser = require('body-parser');
var cors = require('cors');
require("dotenv").config();

const app = express();
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.post('/profile', function (req, res) {
  console.log(req.body)
  res.json(req.body)
})


app.use(routes);

app.get("/", (_req, res) => res.send("Welcome!"));

const port = parseInt(process.env.APP_PORT, 10) || 7001;
app.set("port", port);

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server now running on ${port} port`);
});
