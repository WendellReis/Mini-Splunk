import { pool } from "../db.js";
import errorMessage from "./error.js";
import argon2 from 'argon2';

async function userExists(user) {
    try {
        const sql = 'SELECT COUNT(*) as total FROM Users WHERE login = ?';
        const [rows] = await pool.execute(sql, [user]);

        return rows[0].total > 0;

    } catch(err) {
        console.log('[INFO] Erro ao verificar usuários', err);
        throw err;
    }
}

export async function insertUser(user, password) {
    try {
        if(await userExists(user)) {
            return {
                success: false,
                message: 'Usuario já existe'
            };
        }

        const hash = await argon2.hash(password);

        const sql = 'INSERT INTO Users (login, password) VALUES (?, ?)';
        const [result] = await pool.execute(sql, [user, hash]);

        return {
            success: true,
            insertId: result.insertId
        };

    } catch (err) {
        return errorMessage(err);
    }
}