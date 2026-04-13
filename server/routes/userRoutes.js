import express from 'express';
import { insertUser } from '../repositories/userRepository.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const { user, password } = req.body;
    
    const result = await insertUser(user, password);
    
    if(!result.success) {
        console.log(result)
        console.log(`[INFO] Erro ao criar usuário ${user}: ${result.message || result.error}`);
        return res.status(500).json({
            success: false,
            message: result.message
        });
    }
    console.log(`[INFO] Usuário ${user} criado`);
    return res.status(201).json(result);

});

export default router;