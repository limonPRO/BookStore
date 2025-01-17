import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('username').unique().notNullable();
        table.string('password').notNullable();
      });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('authors');
}
