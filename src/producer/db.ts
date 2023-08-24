import Knex from 'knex'

export const knex = Knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    port: 5432,
    user: 'kolaczyn',
    password: 'postgres',
    database: 'postgres',
  },
})
