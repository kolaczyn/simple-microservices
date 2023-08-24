import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('welcome_messages_outbox', table => {
    table.increments('id').primary()
    table.string('message')
    table.boolean('sent').defaultTo(false)
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('welcome_messages_outbox')
}
