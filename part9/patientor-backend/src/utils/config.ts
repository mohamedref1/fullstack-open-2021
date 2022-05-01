import dotenv from 'dotenv';
import { Port } from './config.types';
dotenv.config();

const PORT: Port = Number(process.env.PORT) || 4000;

export default {
  PORT
};