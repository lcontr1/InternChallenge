const express = require("express");
const router = express.Router();

router.get("/health", (req, res, next) => {
    res.send("healthly route!");
});

router.use("/images", require("./images"));

module.exports = router;