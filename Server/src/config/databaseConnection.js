import {
  Pool,
} from 'pg';
import logger from '../helpers/logger';
import config from './config';

const database = (process.env.NODE_ENV === 'test') ? new Pool(config.test) : new Pool(config.development);
// eslint-disable-next-line
(async () => {
  const res = await database.connect();
  if (res) return logger.info('connection successful');
})().catch(e => setImmediate(() => {
  throw e;
}));
// eslint-disable-next-line

export default database;
