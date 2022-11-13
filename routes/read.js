const express = require("express");
const { getUser } = require("../mysql/queries");
const router = express.Router();

router.get("/", async (req, res) => {
  const { token } = req.headers;

  const query = getUser();

  const params = [token];

  const results = await req.asyncMySQL(query, params);

  if (results.length === 0) {
    res.send({ status: 0, error: "User not found" });
    return;
  }

  res.send({ status: 1, result: results[0] });
});

module.exports = router;
