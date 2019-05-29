const config = require('../../../knexfile');
const { check, validationResult } = require('express-validator/check');
const database = require("../../db");
const Cohort = require("./cohorts.model");

const index = (req, res, next) => {
	// define this in the router and then pass it through to the route
	const authHeader = req.headers.authorization
	if (authHeader.startsWith("Bearer ")){
			
			const token = authHeader.substring(7, authHeader.length);
			let ascii = Buffer.from(token, 'base64').toString('ascii')
			console.log(ascii)
			if (ascii.length >= 16) {
				Cohort.query()
					.then(cohorts => res.json({data: cohorts}))
					.catch(err => next(err))
			} else {
				throw new Error('Unauthorized')
			}
	}

	
}

const show = (req, res, next) => {

	Cohort.query()
				.where("cohorts.id",  req.params.id)
				.then(cohort => res.json({data: cohort[0]}))

}

const create = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log("ERROR")
		return res.status(422).json({ errors: errors.array() });
	}
	return Cohort.insertCohort(req.body)
		.then(cohort => res.json(cohort))
		.catch(error => next(error))
}

const update = (req, res, next) => {
	const errors = validationResult(req);
	    if (!errors.isEmpty()) {
	      console.log("ERROR")
	      return res.status(422).json({ errors: errors.array() });
	    }
	  console.log(req.params.id)
	  const id = req.params.id
	  return Cohort.updateCohort(id, req.body)
	    .then(cohort => res.json(cohort))
	    .catch(error => next(error))
}

module.exports = {
  index, 
  show, 
  create, 
  update
}