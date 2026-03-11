const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/users", (req, res) => {

  db.query("SELECT id,name,permission FROM users WHERE role='user'", (err, result) => {
    res.json(result);
  });

});

router.put("/permission", (req, res) => {

  const { id, permission } = req.body;

  db.query(
    "UPDATE users SET permission=? WHERE id=?",
    [permission, id],
    () => res.json({ message: "Permission updated" })
  );

});

module.exports = router;