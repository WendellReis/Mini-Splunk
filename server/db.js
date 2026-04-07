import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
    host: 'localhost',
    user: 'app',
    password: 'mini-splunk-db',
    database: 'logdb',
    connectionLimit: 10,
    queueLimit: 0
});