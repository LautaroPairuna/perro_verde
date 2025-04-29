const path = require('path');

module.exports = {
  apps: [
    {
      name: 'frontend',
      cwd: __dirname,
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
    {
      name: 'adminjs',
      cwd: path.join(__dirname, 'AdministracionPV'),
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        PORT: 8080,
      },
    },
  ],
};
