
exports.up = (knex) => knex.schema.createTable('cohort_questions', table => {
	table.increments();
	table.integer('cohort_id').references('id').inTable('cohorts').notNull().onDelete('cascade');
	table.integer('question_id').references('id').inTable('questions').notNull().onDelete('cascade');
})

exports.down = (knex) => knex.scheme.dropTable('cohort_questions')
