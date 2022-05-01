import { Logger } from './logger.types';

const info: Logger = (...params) => {
  console.log(...params);
};

const error: Logger = (...params) => {
  console.log(...params);
};

export default {
  info,
  error
};