import schema from './dropTable';
import logger from '../../helpers/logger';

(async () => {
  const res = await schema.dropUserTable();
  if (res) logger.info('Users table dropped');
})().catch(err => logger.info(err.message));
