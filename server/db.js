import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();

const sslCa = process.env.MYSQL_SSL_CA_BASE64
  ? Buffer.from(process.env.MYSQL_SSL_CA_BASE64, "base64").toString("utf8")
  : process.env.MYSQL_SSL_CA;

export const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || "localhost",
  port: Number(process.env.MYSQL_PORT || 3306),
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "",
  database: process.env.MYSQL_DATABASE || "krishi_vikas",
  ssl: sslCa ? { ca: sslCa, rejectUnauthorized: true } : undefined,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export async function query(text, params = []) {
  const [rows] = await pool.execute(text, params);
  return rows;
}
