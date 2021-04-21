require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})

module.exports = {
  host: process.env.DB_SERVER,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  dialect: process.env.DB_DIALECT || 'mysql',
  storage: './tests/database.sqlite',
  logging: false,
  define: {
    timestamp: true,
    underscored: true,
    underscoredAll: true
  }
}
