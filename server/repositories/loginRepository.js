import { pool } from "../db.js";
import errorMessage from "./error.js";
import argon2 from 'argon2';

export async function emptyUsers() {
    try {
        const sql = 'SELECT COUNT(*) AS total FROM Users';
        const [rows] = await pool.execute(sql);

        return rows[0].total === 0;
    } catch (err) {
        console.log('[INFO] Erro ao verificar usuario', err);
    }
    return false;
}

export async function verifyLogin(user, password) {
    try {
        if (await emptyUsers()) {
            if (user === 'admin' && password === 'admin') {
                return {
                    success: true,
                    firstLogin: true
                };
            }

            return {
                success: false,
                message: 'Credenciais inválidas'
            };
        }

        const sql = 'SELECT password from Users WHERE login = ?';
        const [rows] = await pool.execute(sql, [user]);

        if (rows.length === 0) {
            return {
                success: false,
                message: "Credenciais inválidas"
            };
        }

        if (await argon2.verify(rows[0].password, password)) {
            return {
                success: true,
                user: {
                    login: user
                }
            }
        } else {
            return {
                success: false,
                message: 'Credenciais inválidas'
            }
        }

    } catch (err) {
        return errorMessage(err);
    }
}