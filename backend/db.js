
const pool = require('./db/pool.js');
module.exports = { pool, default: pool };
export { pool } from './db/pool.js';
export { pool as default } from './db/pool.js';

