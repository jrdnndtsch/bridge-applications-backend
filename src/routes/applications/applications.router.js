const express = require('express');
const config = require('../../../knexfile');
const database = require('knex')(config);

const { index, show, create } = require("./applications.controller");

const { check, validationResult } = require('express-validator/check');

const router = express.Router();

router.get("", index)
router.get("/:id", show);
router.post("", [
	check("cohort_id").exists(),
	check("cohort_id").custom((value) => {
		return database('cohorts').select('id').where({id: value})
						.then(result => {
							if(result.length === 0) {
								return Promise.reject('Cohort does not exist')
							}
						})
	}), 
	check("user_id").exists(),
	check("user_id").custom((value) => {
		return database('users').select('id').where({id: value})
						.then(result => {
							if(result.length === 0) {
								return Promise.reject('User does not exist')
							}
						})
	}), 
	check(["user_id", "cohort_id"]).custom(values => {
		const [user_id, cohort_id] = values
		return database('applications').select('id').where({user_id: user_id, cohort_id: cohort_id})
				.then(result => {
					if (result.length > 0) {
						return Promise.reject('This user has already applied for this cohort')
					}
				})
	}), 
	// TODO - add start and end date to cohort and validate that the cohort has not started or ended 
	// check("cohort_id").custom(value => {
	// 	return database('cohorts').select
	// })
], create)



module.exports = {
  applicationsRouter: router
}
