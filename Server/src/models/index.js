import schema from './createTables';
import logger from '../helpers/logger';

(async () => {
  const res = await schema.createUsersTable();
  if (res) logger.info('User table successfully migrated');
})().catch(err => logger.info(err.message));

(async () => {
  const res = await schema.createEntriesTable();
  if (res) logger.info('Entries table successfully migrated');
})().catch(err => logger.info(err.message));
