import express from 'express';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { verifyLogin } from '../repositories/loginRepository.js';

const router = express.Router();

const SECRET = 'my-log-server';

router.post('/login', async (req, res) => {
    const { user, password } = req.body;

    const result = await verifyLogin(user, password);
    if (!result.success) {
        return res.status(401).json({
            success: false,
            message: 'Falha na autenticação'
        });
    }

    if (result.firstLogin) {
        return res.status(200).json({
            success: true,
            firstLogin: true
        });
    }

    const token = jwt.sign(
        { user: result.user.login },
        SECRET,
        { expiresIn: '1h' }
    );

    return res.status(200).json({ token });
})

export default router;