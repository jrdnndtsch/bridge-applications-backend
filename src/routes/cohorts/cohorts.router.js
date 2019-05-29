const express = require('express');
const config = require('../../../knexfile');
const database = require('knex')(config);

const { index, show, create, update } = require("./cohorts.controller");

const { check, validationResult } = require('express-validator/check');

const router = express.Router();

// define auth and then pass to the route
router.get("", index)
router.get("/:id", show)
router.post("", create)
router.put("/:id", update)


module.exports = {
  cohortsRouter: router
}
