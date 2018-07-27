import schema from './createTables';
import logger from '../helpers/logger';

schema.createUserTable()
  .then(() => logger.info('User table successfully migrated'))
  .catch(err => logger.info(err.message));
