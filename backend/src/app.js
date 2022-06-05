import express from 'express';
import morgan from 'morgan';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import { swaggerOptions } from './config';
import logger from './logger';
import errorHandler from './_middlewares/error-handler';

const app = express();
const specs = swaggerJsDoc(swaggerOptions);

app.use(morgan('combined', { stream: logger.stream }));
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

app.use(errorHandler);

export default app;
