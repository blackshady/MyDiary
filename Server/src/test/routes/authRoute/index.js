import createSchema from '../../../models/createTables'
import schema from '../../../models/dropDbTable'
import logger from '../../../helpers/logger';

class TestMigration {
  static async createTestTable() {
    const userTable = await createSchema.createUsersTable();
    const entriesTable = await createSchema.createEntriesTable();
    const [userRes, entriesRes] = await Promise.all([userTable, entriesTable]);
    return userRes && entriesRes && logger.info('User table and Entries Table successfully migrated');
  }
  static async dropTestTable() {
    const userTable = await schema.dropUserTable();
    const entriesTable = await schema.dropEntriesTable();
    const [userRes, entriesRes] = await Promise.all([userTable, entriesTable]);
    return userRes && entriesRes && logger.info('Users table and Entries Table dropped');
  }

}

export default TestMigration;