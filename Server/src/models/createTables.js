import database from '../config/databaseConnection';

export default {

  createUsersTable() {
    const usersSchema = `
    CREATE TABLE IF NOT EXISTS users (
      userId SERIAL PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      surname VARCHAR(80) NOT NULL,
      userName VARCHAR(255) NOT NULL,
      firstName VARCHAR(255) NOT NULL,
      phoneNumber VARCHAR(80),
      passwordHash  VARCHAR(255) NOT NULL,
      profileImageUrl VARCHAR(80),
      totalCreatedEntries INTEGER,
      reminder  TIME WITH TIME ZONE
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
      time VARCHAR(30) NOT NULL,
      date VARCHAR(30) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `;
    return database.query(entriesSchema);
  },

};