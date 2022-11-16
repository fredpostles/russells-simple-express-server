const express = require("express");
const router = express.Router();
const { updateUser } = require("../mysql/queries");
const sha256 = require("sha256");

router.put("/", async (req, res) => {
  let { email, name, password } = req.body;
  const { token } = req.headers;

  let params = [];

  if (email && typeof email === "string") {
    let column = "email";
    const query = updateUser(column);
    params = [email, token];
    await req.asyncMySQL(query, params);
  }
  if (name && typeof name === "string") {
    let column = "name";
    const query = updateUser(column);
    params = [name, token];
    await req.asyncMySQL(query, params);
  }
  if (password && typeof password === "string") {
    password = sha256(process.env.SALT + password);
    let column = "password";
    const query = updateUser(column);
    params = [password, token];
    await req.asyncMySQL(query, params);
  }

  res.send({ status: 1 });
});

module.exports = router;
