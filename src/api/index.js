const express = require("express");


const { healthRouter } = require('../routes/health/health.router')
const { usersRouter } = require('../routes/users/users.router')
const { cohortsRouter } = require('../routes/cohorts/cohorts.router');
const { applicationsRouter } = require('../routes/applications/applications.router');

const router = express.Router();
router.use("/", healthRouter);
router.use("/users", usersRouter);
router.use("/cohorts", cohortsRouter);
router.use("/applications", applicationsRouter);


module.exports = router;
