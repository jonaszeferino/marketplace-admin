import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'db4free.net',
  user: 'admin_mkt',
  password: 'W@terfall1909',
  database: 'mkt_app',
});

export default pool;
