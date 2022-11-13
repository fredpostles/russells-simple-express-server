const express = require("express");
const router = express.Router();
const { updateUser } = require("../mysql/queries");
const sha256 = require("sha256");

router.put("/", async (req, res) => {
  let { email, name, password } = req.body;
  const { token } = req.headers;

  const query = updateUser();
  let params = [];

  if (email && typeof email === "string") {
    let column = "email";
    params = [email, token];
    await req.asyncMySQL(query, params, column);
  }
  if (name && typeof name === "string") {
    let column = "name";
    params = [name, token];
    await req.asyncMySQL(query, params, column);
  }
  if (password && typeof password === "string") {
    password = sha256(process.env.SALT + password);
    let column = "password";
    params = [password, token];
    await req.asyncMySQL(query, params, column);
  }

  res.send({ status: 1 });
});

module.exports = router;
