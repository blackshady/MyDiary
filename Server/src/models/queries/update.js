export default {
  userEntry: 'UPDATE entries SET title = $1, story=$2, updated_at = $3 WHERE entryId=$4  AND userId=$5 RETURNING *',
  totalEntry: 'UPDATE users SET totalcreatedentries= totalcreatedentries + 1 WHERE userId=$1  RETURNING *',
  defualtTotalEntry: 'UPDATE users SET totalcreatedentries = 0  WHERE userId=$1  RETURNING *',
  userImage: 'UPDATE users SET profileImageUrl = $1 WHERE userId=$2 RETURNING *',
  userPassword: 'UPDATE users SET passwordhash = $1 WHERE email=$2 RETURNING *',
};
