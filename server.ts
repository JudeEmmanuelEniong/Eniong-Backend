require('dotenv').config();

import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { initializeDb } from './_helpers/db';
import errorHandler from './_middleware/error-handler';
import accountsController from './accounts/accounts.controller';
import swaggerDocs from './_helpers/swagger';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors({ 
    origin: process.env.CORS_ORIGIN || 'http://localhost:4200',
    credentials: true 
}));

app.use('/accounts', accountsController);
app.use('/api-docs', swaggerDocs);
app.use(errorHandler);

const port = process.env.PORT || 4000;

// Initialize DB first, then start server
initializeDb().then(() => {
    app.listen(port, () => console.log('Server listening on port ' + port));
}).catch(err => {
    console.error('Failed to initialize database:', err);
    process.exit(1);
});