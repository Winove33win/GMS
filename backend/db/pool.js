import mysql from "mysql2/promise";

const {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
  DB_NAME,
  DB_PORT = 3306
} = process.env;

const database = DB_DATABASE || DB_NAME;

if (!DB_HOST || !DB_USER || !DB_PASSWORD || !database) {
  console.warn("[db] DB_* ausentes. Configure no Plesk.");
}

export const pool = mysql.createPool({
  host: DB_HOST,
  port: Number(DB_PORT) || 3306,
  user: DB_USER,
  password: DB_PASSWORD,
  database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  timezone: "Z"
});

export default pool;
