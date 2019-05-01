
exports.up = (knex) => knex.schema.createTable('cohorts', table => {
	table.increments();
	table.string('name').notNullable();
	table.text('welcome_text', 'longtext');
	table.text('thank_you_text', 'longtext');
}).createTable('applications', table => {
	table.increments();
	table.integer('user_id').references('id').inTable('users').notNull().onDelete('cascade');
	table.integer('cohort_id').references('id').inTable('cohorts').notNull();
	table.boolean('accepted_test').nullable();
	table.boolean('accepted_cohort').nullable();
}).createTable('questions', table => {
	table.increments();
	table.text('question_text', 'mediumtext').notNullable();
	table.boolean('allow_multiple_answers').defaultTo(false).notNullable();
	table.boolean('required').defaultTo(false).notNullable();
}).createTable('answer_choices', table => {
	table.increments();
	table.text('answer_text', 'mediumtext').notNullable();
	table.integer('question_id').references('id').inTable('questions').notNull();
}).createTable('responses', table => {
	table.increments();
	table.integer('question_id').references('id').inTable('questions').notNull();
	table.integer('application_id').references('id').inTable('applications').notNull().onDelete('cascade');
	table.integer('answer_choices_id').references('id').inTable('answer_choices').nullable();	
	table.text('text', 'longtext');
})


exports.down = (knex) => knex.schema.dropTable('responses')
																		.dropTable('answer_choices')
																		.dropTable('questions')
																		.dropTable('applications')
																		.dropTable('cohorts');
