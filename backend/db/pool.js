import mysql from 'mysql2/promise';

const {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_PORT,
  DB_CONN_LIMIT,
} = process.env;

const missing = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'].filter((key) => {
  const value = process.env[key];
  return !value || String(value).trim() === '';
});

if (missing.length) {
  throw new Error(`Missing required database environment variables: ${missing.join(', ')}`);
}

const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: DB_PORT ? Number(DB_PORT) : 3306,
  waitForConnections: true,
  connectionLimit: DB_CONN_LIMIT ? Number(DB_CONN_LIMIT) : 10,
  queueLimit: 0,
  timezone: 'Z',
});

export { pool };
export default pool;
