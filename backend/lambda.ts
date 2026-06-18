// lambda.js
import serverless from 'serverless-http';
import app from './app.js';           // your Express app

export const handler = serverless(app);