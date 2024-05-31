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

app.post("/api/admin/create-email-address", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const mail = `maildir:/home/vmail/team.ditiosys.com/${
    email.split("@")[0]
  }/Maildir`;
  const emailOwner_id = "team.ditiosys.com";

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.error(err);
    } else {
      const hashedPassword = `{CRYPT}${hash}`;
      cyberdb.query(
        "INSERT INTO e_users (email, password, mail, DiskUsage, emailOwner_id) VALUES (?, ?, ?, 0, ?)",
        [email, hashedPassword, mail, emailOwner_id],
        (err, result) => {
          if (err) {
            console.log(err);
            res.json({ message: "Internal Error", error: err.message });
          } else {
            res.json({ message: "successfully created" });
          }
        }
      );
    }
  });
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
