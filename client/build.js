const { execSync } = require('child_process');
const env = process.env.VERCEL_ENV;

if (env === 'preview') {
  execSync('ng build --configuration staging', { stdio: 'inherit' });
} else {
  execSync('ng build --configuration production', { stdio: 'inherit' });
}