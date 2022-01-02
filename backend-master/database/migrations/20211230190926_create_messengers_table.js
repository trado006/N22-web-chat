exports.up = function(knex) {
    return knex.schema.createTable('messengers', function(table) {
        table.increments('id');
        table.integer('me_id').unsigned().references('users.id').notNullable();
        table.integer('partner_id').unsigned().references('users.id').notNullable();

        table.index('me_id');
        table.index('partner_id');

        table.boolean('is_new').defaultTo(false).notNullable();
        table.integer('last_msg').unsigned().defaultTo(0).notNullable();

        table.timestamp('created_at').nullable().defaultTo(knex.fn.now());

        table.unique(['me_id', 'partner_id']);
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('messengers');
};