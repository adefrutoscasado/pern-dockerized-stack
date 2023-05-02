
const databaseConfig = {
  client: 'mysql2',
  version: '5.7',
  connection: {
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  }
}

const config = {
  database: {
    ...databaseConfig,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
}

module.exports = config
