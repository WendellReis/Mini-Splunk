import express from 'express';
import jwt from 'jsonwebtoken';
import { verifyLogin } from '../repositories/loginRepository.js';

const router = express.Router();

const SECRET = 'my-log-server';

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
        { user },
        SECRET,
        { expiresIn: '1h' }
    );

    return res.status(200).json({ 
        success: true, 
        token 
    });
})

export default router;