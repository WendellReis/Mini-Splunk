import { pool } from "../db.js";

export async function insertLogs(logs) {
    try {
        const values = [];
    
        logs.forEach(item => {
            values.push(
                item.ip,
                item.timestamp,
                item.hostname,
                item.user_id,
                item.message,
                item.service,
                item.process,
                item.unit,
                item.boot_id,
                item.mac,
                item.priority
            );
        });

        const placeholders = logs
            .map(() => '(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
            .join(', ');

        const sql = `
            INSERT INTO Logs (
                ip,
                timestamp,
                hostname,
                user_id,
                message,
                service,
                process,
                unit,
                boot_id,
                mac,
                priority
            )
            VALUES ${placeholders}
        `;

        const [result] = await pool.execute(sql, values);

        return {
            success: true,
            insertId: result.insertId
        };

    } catch(err) {
        console.error('[DB ERROR]', err.code);
        return {
            success: false,
            error: err.code
        };
    }
}

export async function getLogs() {
    const sql = 'SELECT * FROM Logs';

    const [rows] = await pool.execute(sql);
    return rows
}