const { Model } = require("objection");


class Cohort extends Model {
  static insertCohort({
    name, 
    welcome_text, 
    thank_you_text
  }) {
    return Cohort.query()
      .insert({
        name, 
        welcome_text, 
        thank_you_text
      })
      .returning("*");
  }
  static get tableName() {
    return "cohorts";
  }

  static updateCohort(id, params) {
      return Cohort.query()
      .findById(id)
      .patch(params)
      .returning("*");
    }

  static get relationMappings(){
    const Application = require("../applications/applications.model");
    return {
      applications: {
        relation: Model.HasManyRelation, 
        modelClass: Application, 
        join: {
          from: "cohorts.id", 
          to: "applications.cohort_id"
        }
      }
    }
  }  

}

module.exports = Cohort;