const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/login", (req, res) => {

  const { email, password } = req.body;

  const query = "SELECT * FROM users WHERE email=? AND password=?";

  db.query(query, [email, password], (err, result) => {

    if (result.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json(result[0]);

  });

});

module.exports = router;