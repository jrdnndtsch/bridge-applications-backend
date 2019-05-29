const Knex = require("knex");
const { Model } = require("objection");
const configuration = require("../knexfile");

const KnexInstance = Knex(configuration);

//Init Model with Knex only once in app
Model.knex(KnexInstance);

//Init the Knex instance only once, as it create a connection pool.
module.exports = KnexInstance;