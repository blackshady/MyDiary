import createSchema from '../../../models/createTables'
import schema from '../../../models/dropDbTable'
import logger from '../../../helpers/logger';

class TestMigration {
  static async createTestTable() {
    const res = await createSchema.createUsersTable();
    return res && logger.info('User table successfully migrated');
  }
  static async dropTestTable() {
    const res = await schema.dropUserTable();
    return res && logger.info('Users table dropped');
  }

}

export default TestMigration;