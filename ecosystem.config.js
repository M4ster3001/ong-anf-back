const os = require( 'os' );

const numCPUs = os.cpus().length;
const numWorkers = Math.round( numCPUs * ( numCPUs <= 4 ? 0.5 : 0.8 ) );
//const free_mem = parseInt( ( os.freemem() - ( os.freemem() * 0.1 ) ) / 1024 ) / 1024;

module.exports = {
  apps : [{
    "name": "animal_finders",
    "exec_mode": "cluster",
    "instances": numWorkers,
    "script": "./dist/server.js",
    "exec_interpreter": "./node_modules/.bin/babel-node",
    "max_memory_restart": "1G",
    "watch": true,
    env: {
      "NODE_ENV": "development"
    },
    env_production: {
      "NODE_ENV": "production"
    },
  }],
};


