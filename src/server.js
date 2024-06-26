import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import router from './routers/index.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';

const PORT = env.PORT || 3000;

export const setupServer = () => {

    const app = express();
app.use(cookieParser());

app.use(express.json({
  type: ['application/json', 'application/vnd.api+json'],
}));
    app.use(cors());

    app.use(
  pino({
    transport: {
      target: 'pino-pretty',
    },
  }),
    );
    app.use(router);

    app.use('*', notFoundHandler);
    app.use(errorHandler);

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

};