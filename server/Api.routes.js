const express = require("express");
const router = express.Router();

const mysql = require("mysql");
const con = mysql.createConnection({
  host: "63.33.172.234",
  port: 3554,
  user: "guest",
  password: "GHE3FJU",
  database: "tradair"
});

// Simulate server delayed response
function send(res, data) {
  setTimeout(() => {
    res.send(data);
  }, 10);
}

// routs
router.post("/", (req, res) =>
  send(res.status(200), { responseText: "internal POST Tested" })
);

router.get("/currency_pairs", (req, res) => {
  con.query("SELECT * FROM currency_pairs", function(err, result, fields) {
    if (err) throw err;
    send(res.status(200), JSON.stringify(result));
  });
});

router.get("/rates/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM rates WHERE currency_pair_id = ? ";
  con.query(sql, [id], function(err, result, fields) {
    if (err) throw err;
    send(res.status(200), JSON.stringify(result));
  });
});

module.exports = router;
