import { MiddlewareFn, ErrorHandlerFn } from './middleware.types';
import logger from './logger';

const requestLogger: MiddlewareFn = (req, _res, next) => {
  logger.info('Method: ', req.method);
  logger.info('Path: ', req.path);
  logger.info('Body: ', req.body);
  next();
};

const unkownEndPoint: MiddlewareFn = (_req, res) => {
  res.status(404).json('unkown endpoint');
};

const errorHandler: ErrorHandlerFn = (error, _req, res, next) => {
  if (error instanceof Error && typeof error.message === 'string') {
    res.status(400).json({ error: error.message });
    return;
  }

  next();
};

export default {
  requestLogger,
  unkownEndPoint,
  errorHandler
};