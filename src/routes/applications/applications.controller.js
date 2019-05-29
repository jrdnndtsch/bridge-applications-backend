const config = require('../../../knexfile');
const { check, validationResult } = require('express-validator/check');
const database = require("../../db");
const Application = require("./applications.model");

const index = (req, res, next) => {
	Application.query()
						.then(applications => res.json({data: applications}))	
						.catch(err => next(err))
}

const show = (req, res, next) => {
	return Application.query()
										.where("applications.id", req.params.id)
										.then(applications => {
											if(applications.length > 0) {
												return res.json({data: applications[0]})
											}
											throw new NotFoundError("unable to find application");
										})
}

const create = (req, res, next) => {
	Application.insertApplication(req.body)
						.then(application => res.json(application))
						.catch(err => next(err))
}

const update = (req, res, next) => {
	return Application.updateApplication(req.params.id, req.body)
					.then(application => res.json(application))
					.catch(err => next(err))
}

module.exports = {
	index, 
	show, 
	create

}