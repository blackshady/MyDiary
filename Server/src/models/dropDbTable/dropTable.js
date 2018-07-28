import database from '../../config/databaseConnection';

export default {
  dropUserTable() {
    const User = `
    DROP TABLE IF EXISTS users CASCADE;`;
    return database.query(User);
  },
};
