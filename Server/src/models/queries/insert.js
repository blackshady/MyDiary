export default {
  userCredentials: 'INSERT INTO users (email, surname, username, firstName, phoneNumber, passwordHash ) VALUES ($1, $2, $3, $4, $5, $6) returning *',
  userEntries: 'INSERT INTO entries (userid, title, story, created_at) VALUES ($1,$2,$3,$4) returning *',
};
