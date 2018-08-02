export default {
  userCredentials: 'INSERT INTO users (email, surname, username, firstName, phoneNumber, passwordHash ) VALUES ($1, $2, $3, $4, $5, $6) returning *',
  userEntries: 'INSERT INTO entries (userid, title, story) VALUES ($1,$2,$3) returning *',
};
