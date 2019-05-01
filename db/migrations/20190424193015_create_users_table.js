
exports.up = (knex) => knex.schema.createTable('users', table => {
	table.increments();
	table.string('first_name').notNullable();
	table.string('last_name').notNullable();
	table.string('email').notNullable().unique();
	table.string('pronouns').notNullable();
	table.enu('employment_status', ['full_time', 'part_time', 'in_school', 'looking', 'not_looking']).notNullable();
	table.string('employer');
}).createTable('identities', table => {
	table.increments();
	table.string('name').notNullable();
	table.boolean('gender').notNullable();
	table.boolean('user_generated').notNullable();
}).createTable('user_identities', table => {
	table.increments();
	table.integer('user_id').references('id').inTable('users').notNull().onDelete('cascade');
	table.integer('identity_id').references('id').inTable('identities').notNull().onDelete('cascade');

})

exports.down = (knex) => knex.schema.dropTable('user_identities')
																		.dropTable('identities')	
																		.dropTable('users');
																		
