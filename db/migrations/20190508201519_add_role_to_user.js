exports.up = (knex) => {
  return knex.schema.table('users', (u) => {
  	u.enu('role', ['user', 'admin', 'super_admin']).notNullable();
  })
};

exports.down = (knex) => {
  return knex.schema.table('users', (u) => {
  	u.dropColumn('role');
  })
};
