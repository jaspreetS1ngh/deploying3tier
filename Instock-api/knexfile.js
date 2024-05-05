require('dotenv').config();
// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  client: 'mysql2', // Specifies the database client
  connection: {
    host: 'db',     // Typically the service name in docker-compose.yml
    database: 'Instock', // Name of the database
    user: 'root',   // Username for the database
    password: 'root'  // Password for the database user
  },
  migrations: {
    directory: './DBsetup/migrations'  // Path to the migrations directory
  },
  seeds: {
    directory: './DBsetup/seeds'  // Path to the seeds directory
  }
};

