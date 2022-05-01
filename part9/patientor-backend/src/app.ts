import express, { Express } from 'express';
import cors from 'cors';
import middleware from './utils/middleware';
import pingRouter from './routes/ping';
import diagnosisRouter from './routes/diagnosis';
import patientsRouter from './routes/patients';

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/ping', pingRouter);
app.use('/api/diagnosis', diagnosisRouter);
app.use('/api/patients', patientsRouter);

app.use(middleware.unkownEndPoint);
app.use(middleware.errorHandler);

export default app;