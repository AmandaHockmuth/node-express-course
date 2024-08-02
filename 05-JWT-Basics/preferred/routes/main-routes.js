const express = require("express");
const router = express.Router();
const { logon, hello } = require("../controllers/main-controller");
const authMiddleware = require(`../middleware/auth`);

//     Routes
router.route("/hello").get(authMiddleware, hello);
router.route("/logon").post(logon);

module.exports = router;
