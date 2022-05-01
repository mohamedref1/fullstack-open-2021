import http, { Server } from 'http';
import logger from './utils/logger';
import config from './utils/config';
import app from './app';

const server: Server = http.createServer(app);

server.listen(config.PORT, (): void => {
  logger.info(`Server is running on port: ${config.PORT}`);
});