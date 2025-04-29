const path = require('path');

module.exports = {
  apps: [
    {
      name: 'adminjs',  // Solo se ejecutará AdminJS
      cwd: path.join(__dirname, 'AdministracionPV'),
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        PORT: 8080, // Usar un puerto diferente para AdminJS
      },
    },
  ],
};
