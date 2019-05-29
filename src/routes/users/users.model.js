const { Model } = require("objection");


class User extends Model {
  static insertUser({
    first_name,
    last_name,
    email,
    employment_status,
    employer,
    pronouns
  }) {
    return User.query()
      .insert({
        first_name,
        last_name,
        email,
        employment_status,
        employer,
        pronouns
      })
      .returning("*");
  }
  static get tableName() {
    return "users";
  }

  static get relationMappings() {
    const Identity = require("../Identities/identities.model");
    const Application = require("../applications/applications.model");
    return {
      identities: {
        relation: Model.ManyToManyRelation, 
        modelClass: Identity,
        join: {
          from: "users.id", 
          through: {
            from: "user_identities.user_id", 
            to: "user_identities.identity_id"
          },
          to: "identities.id"
        }
      }, 
      applications: {
        relation: Model.HasManyRelation, 
        modelClass: Application, 
        join: {
          from: "users.id", 
          to: "applications.user_id"
        }
      }
    }
  }
}

module.exports = User;