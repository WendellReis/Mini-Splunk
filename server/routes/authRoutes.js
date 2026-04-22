import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { verifyLogin } from '../repositories/loginRepository.js';

dotenv.config();

const router = express.Router();

router.post('/login', async (req, res) => {
    const { user, password } = req.body;

    const result = await verifyLogin(user, password);
    if (!result.success) {
        console.log(`[AUTH] Falha na autenicação: ${user} (${req.ip})`)
        return res.status(401).json({
            success: false,
            message: 'Falha na autenticação'
        });
    }

    console.log(`[AUTH] Autenticação concluída: ${user} (${req.ip})`)
    if (result.firstLogin) {
        return res.status(200).json({
            success: true,
            firstLogin: true
        });
    }

    const token = jwt.sign(
        {
            userId: result.userId,
            user
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    return res.status(200).json({
        success: true,
        token
    });
})

router.get('/validate', async (req, res) => {
    try {
        const authHead = req.headers.authorization;

        if(!authHead) {
            return res.status(401).json({
                success: false,
                message: 'Token não informado'
            });
        }

        const token = authHead.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        return res.status(200).json({
            success: true,
            message: 'Acesso Autorizado'
        });
    } catch(err) {
        return res.status(401).json({
            success: false,
            error: 'Token Inválido ou Expirado'
        });
    }
});

export default router;