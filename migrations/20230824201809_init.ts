import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('welcome_messages', table => {
    table.integer('id').primary()
    table.string('message')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('welcome_messages')
}
