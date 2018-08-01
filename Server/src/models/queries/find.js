export default {
  userByEmail: 'SELECT * FROM users WHERE email = $1 LIMIT 1;',
  specificUserDiary: 'SELECT * FROM entries WHERE entryId=$1 LIMIT 1',
  userEntries: 'SELECT * FROM entries WHERE userId = $1',
};
