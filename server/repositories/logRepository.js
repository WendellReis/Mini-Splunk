import { pool } from "../db.js";

export async function insertLog(log) {
    const {
        ip,
        timestamp,
        hostname,
        user_id,
        message,
        service,
        process,
        unit,
        boot_id,
        mac
    } = log;

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
            mac 
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await pool.execute(sql, log);
    return result.insertId;
}