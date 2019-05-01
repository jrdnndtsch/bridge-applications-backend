const express = require("express");


const { healthRouter } = require('../routes/health/health.router')
const { usersRouter } = require('../routes/users/users.router')

const router = express.Router();
router.use("/health", healthRouter);
router.use("/users", usersRouter);


module.exports = router;
