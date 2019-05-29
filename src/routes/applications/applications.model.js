const { Model } = require("objection");


class Application extends Model {
  static insertApplication({
    cohort_id, 
    user_id, 
    accepted_test, 
    accepted_cohort
  }) {
    return Application.query()
      .insert({
        cohort_id, 
        user_id, 
        accepted_test, 
        accepted_cohort
      })
      .returning("*");
  }
  static get tableName() {
    return "applications";
  }

  static updateApplication(id, params) {
      return Application.query()
      .findById(id)
      .patch(params)
      .returning("*");
   }

  

   static get relationMappings(){
     const Cohort = require("../cohorts/cohorts.model");
     const User = require("../users/users.model");
     return {
       cohort: {
         relation: Model.BelongsToOneRelation,
         modelClass: Cohort, 
         join: {
           from: "applications.cohort_id", 
           to: "cohorts.id"
         }
       }, 
       user: {
         relation: Model.BelongsToOneRelation, 
         modelClass: User, 
         join: {
           from: "applications.user_id", 
           to: "cohorts.user_id"
         }
       }
     }
   }


}

module.exports = Application;