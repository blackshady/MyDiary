export default {
  userByEmail: 'SELECT * FROM users WHERE email = $1 LIMIT 1;',
  specificUserDiary: 'SELECT * FROM entries WHERE entryId=$1  AND userId=$2 LIMIT 1',
  userEntries: 'SELECT * FROM entries WHERE userId = $1',
  byEntryTitle: 'SELECT * FROM entries WHERE entryId = $1 AND title = $2 RETURNING *',
};