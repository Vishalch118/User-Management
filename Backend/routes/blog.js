const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {

  db.query("SELECT * FROM blog", (err, result) => {
    res.json(result[0]);
  });

});

router.put("/update", (req, res) => {

  const { content, user } = req.body;

  db.query(
    "UPDATE blog SET content=?, updated_by=? WHERE id=1",
    [content, user],
    () => {
      res.json({ message: "Blog updated" });
    }
  );

});

module.exports = router;