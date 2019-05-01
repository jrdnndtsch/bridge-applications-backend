const config = require('../../../knexfile');
const database = require('knex')(config);
const { check, validationResult } = require('express-validator/check');


const index = (req, res, next) => {
	return database('users').select('users.*', 'identities.name as identifier')
													.leftJoin('user_identities', 'users.id', '=', 'user_identities.user_id')
													.leftJoin('identities', 'identities.id', '=', 'user_identities.identity_id')
													.then((users) => res.json({users}))
													.catch((err) => next(err))
}

const show = (req, res, next) => {

	return database('users').select('users.*', 'identities.name as identifier')
													.leftJoin('user_identities', 'users.id', '=', 'user_identities.user_id')
													.leftJoin('identities', 'identities.id', '=', 'user_identities.identity_id')
													.where('users.id', req.params.id)
													.then((users) => {
														console.log('TEST')
														if(users.length) {
															res.json({
																...users[0], 
																user_identity: users.map(user => user.identifier)
															})
														} else {
															res.status(404).json({
																error: 'User not found'
															})
														}
													})
													.catch((err) => next(err));	 
}

const create = (req, res, next) => {
	const errors = validationResult(req)
	if(!errors.isEmpty()){
		console.log(errors)
		return res.status(422).json({ errors: errors.array() })
	}

	
	const {
		first_name, 
		last_name, 
		email, 
		pronouns, 
		employment_status, 
		identities
	} = req.body;

	return database('users')
		.insert({
			first_name, 
			last_name, 
			email, 
			pronouns, 
			employment_status
		})
		.returning('*')
		.then((users) => {
		
			if (identities.length) {
				database('identities')
					.select('*')
					.whereIn('name', identities.map(i => i.name)).then(existing => {
						if(existing){
							if (existing.length === identities.length) {
								return existing.map(i => i.id)
							}
							const new_identities = req.body.identities
								.filter(info => !existing.find(i => i.name === info.name))
								.map(i => ({ name: i.name, gender: i.gender, user_generated: true || false }));
							return database('identities')
							              .insert(new_identities)
							              .returning("id");	
						} 
			
					})
					.then(identity_ids => {
						return database('user_identities').insert(identity_ids.map(id => ({
							user_id: users[0].id, 
							identity_id: id
						})))
					})
					.then(() => {
						return res.json({users})
					})
			} // if there are identities in the request body
		
		return res.json({users})
	})
}


module.exports = {
  index, 
  show,
  create
}


	// insert value into user_identities table
							// database('user_identities').insert(existing.map((info) => {
							// 	return {
							// 		user_id: users[0].id, 
							// 		identity_id: info.id
							// 	}
							// })).then(() => {
							// 	if(existing.length === identities.length) {
							// 		res.json({
							// 			user: {
							// 				...users[0], 
							// 				identities: existing
							// 			}
							// 		})
							// 	}
								
							// })	