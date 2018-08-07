export default {
  userCredentials: 'INSERT INTO users (email, username, passwordHash ) VALUES ($1, $2, $3) returning *',
  userEntries: 'INSERT INTO entries (userid, title, story) VALUES ($1,$2,$3) returning *',
};
