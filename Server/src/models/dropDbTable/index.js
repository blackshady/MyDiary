import schema from './dropTable';
import logger from '../../helpers/logger';

(async () => {
  const res = await schema.dropUserTable();
  if (res) logger.info('Users table dropped');
})().catch(err => logger.info(err.message));

(async () => {
  const res = await schema.dropEntriesTable();
  if (res) logger.info('Entries table dropped');
})().catch(err => logger.info(err.message));
