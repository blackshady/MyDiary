import schema from './createTables';
import logger from '../helpers/logger';

(async () => {
  const res = await schema.createUserTable();
  if (res) logger.info('User table successfully migrated');
})().catch(err => logger.info(err.message));
