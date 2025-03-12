const { exec } = require('child_process');

async function runMigrations() {
  try {
    console.log('Running migrations...');
    await new Promise((resolve, reject) => {
      exec('npx sequelize-cli db:migrate', (err, stdout, stderr) => {
        if (err) {
          reject(`Error: ${stderr}`);
        } else {
          console.log(stdout);
          resolve();
        }
      });
    });
    console.log('Migrations completed successfully.');
  } catch (error) {
    console.error('Error during migrations:', error);
  }
}

module.exports = { runMigrations };