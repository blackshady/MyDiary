import database from '../../config/databaseConnection';

export default {
  dropUserTable() {
    const usersSchema = `
    DROP TABLE IF EXISTS users CASCADE;`;
    return database.query(usersSchema);
  },
  dropEntriesTable() {
    const entriesSchema = `
    DROP TABLE IF EXISTS entries CASCADE;`;
    return database.query(entriesSchema);
  },
};
