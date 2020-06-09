const os = require( 'os' );

const numCPUs = os.cpus().length;
const numWorkers = Math.round( numCPUs * 0.5 );
//const free_mem = parseInt( ( os.freemem() - ( os.freemem() * 0.1 ) ) / 1024 ) / 1024;

module.exports = {
  apps : [{
    "name": "web",
    "exec_mode": "cluster",
    "instances": numWorkers,
    "script": "./src/server.ts",
    "interpreter": "./node_modules/.bin/ts-node",
    "max_memory_restart": "1G",
    "watch": true,
    env: {
      "NODE_ENV": "development"
    },
    env_production: {
      "NODE_ENV": "production"
    },
  }],
 
  deploy : {
    production : {
      user : 'SSH_USERNAME',
      host : 'SSH_HOSTMACHINE',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  },
};
