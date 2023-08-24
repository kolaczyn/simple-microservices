const connection = {
  host: '127.0.0.1',
  port: 5432,
  user: 'kolaczyn',
  password: 'postgres',
  database: 'postgres',
}

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  client: 'postgresql',
  connection,
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
  },
}
