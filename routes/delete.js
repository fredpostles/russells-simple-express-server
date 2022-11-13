const express = require("express");
const { deleteUser } = require("../mysql/queries");
const router = express.Router();

router.delete("/", async (req, res) => {
  const { token } = req.headers;

  const query = deleteUser();

  const params = [token];

  await req.asyncMySQL(query, params);
  res.send({ status: 1 });
});

module.exports = router;
