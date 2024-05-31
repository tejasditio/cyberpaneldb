const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const mysql = require("mysql");

const app = express();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

const saltRounds = 12;

const cyberdb = mysql.createConnection({
  host: "localhost",
  user: "tejas",
  password: "Dynoarcyt25801@",
  database: "cyberpanel",
});

app.get("/", (req, res) => {
  console.log("Hello world");
  cyberdb.query("SELECT * FROM e_users", (err, rows) => {
    if (err) {
      console.log("Error", err);
    } else {
      console.log(rows);
    }
  });
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
