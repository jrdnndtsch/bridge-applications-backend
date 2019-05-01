const express = require('express');
const config = require('../../../knexfile');
const database = require('knex')(config);

const { index, show, create } = require("./users.controller");

const { check, validationResult } = require('express-validator/check');

const router = express.Router();

router.get("", index);
router.get("/:id", show);
router.post("",[
		check('first_name', 'first name must be 2 characters').isLength({min: 2}),
		check('last_name', 'last name must be at least 2 characters').isLength({min: 2}),
		check('email', 'email must be valid').isEmail(), 
		check('email').custom((value) => {
			return database('users').where({email: value}).then((users) => {
				if(users.length){
					return Promise.reject('Email must be unique')
				}
			})
		}),
		check('pronouns', 'pronouns must be present').exists(),
		check('identities').isArray()
	], create);


module.exports = {
  usersRouter: router
}

