import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'app',
    password: 'mini-splunk-db',
    database: 'logdb',
    connectionLimit: 10,
    queueLimit: 0
}).promise()

export function getConnection() {
    return pool;
}