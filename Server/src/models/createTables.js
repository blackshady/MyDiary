import database from '../config/databaseConnection';

export default {

  createUsersTable() {
    const usersSchema = `
    CREATE TABLE IF NOT EXISTS users (
      userId SERIAL PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      userName VARCHAR(255) NOT NULL,
      passwordHash  VARCHAR(255) NOT NULL,
      profileImageUrl VARCHAR(255),
      totalCreatedEntries INTEGER,
      reminder  VARCHAR(255)
    );
    `;
    return database.query(usersSchema);
  },

  createEntriesTable() {
    const entriesSchema = `
    CREATE TABLE IF NOT EXISTS entries (
      entryId SERIAL PRIMARY KEY,
      userId INTEGER REFERENCES users(userId),
      title TEXT NOT NULL,
      story TEXT NOT NULL,
      created_at TIMESTAMP (0) without time zone default now(),
      updated_at TIMESTAMP  
    );
    `;
    return database.query(entriesSchema);
  },

};