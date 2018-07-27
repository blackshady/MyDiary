// handle async call error
// Source from Wes bos
const asyncCatchErrors = fn => (req, res, next) => fn(req, res, next).catch(next);
export default asyncCatchErrors;
