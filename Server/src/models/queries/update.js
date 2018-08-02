export default {
  userEntry: 'UPDATE entries SET title = $1, story=$2, updated_at = $3 WHERE entryId=$4  AND userId=$5 RETURNING *',
};
