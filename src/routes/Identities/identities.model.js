const { Model } = require("objection");

class Identity extends Model {
  static get tableName() {
    return "identities";
  }
}

module.exports = Identity;