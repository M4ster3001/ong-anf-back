// Update with your config settings.
const path = require( 'path' )

module.exports = {

    development: {
      client: 'sqlite3',
      connection: {
        filename: path.resolve( __dirname, 'src', 'database', 'database.sqlite' ),
        acquireConnectionTimeout: 10000
      },
      migrations: {
        directory: path.resolve( __dirname, 'src', 'database', 'migrations')
      },
      seeds: {
        directory: path.resolve( __dirname, 'src', 'database', 'seeds' )
      },
      useNullAsDefault: true,
      debug: true,
      pool: {
        min: 1,
        max: 20,
      },
      
    },

    production: {
      client: 'sqlite3',
      connection: {
        filename: path.resolve( __dirname, 'src', 'database', 'database.sqlite' ),
        acquireConnectionTimeout: 10000
      },
      migrations: {
        directory: path.resolve( __dirname, 'src', 'database', 'migrations')
      },
      seeds: {
        directory: path.resolve( __dirname, 'src', 'database', 'seeds' )
      },
      useNullAsDefault: true,
      pool: {
        min: 1,
        max: 20,
      },
      
    }
  
  };
  