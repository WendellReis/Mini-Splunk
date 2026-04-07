import express from 'express';
import { insertLog } from '../repositories/logRepository.js';

const router = express.Router()

router.post('/', async (req, res) => {
    const data = req.body;

    if(!Array.isArray(data)) {
        return res.status(400).send('Um array era esperado');
    } else if(data.length == 0) {
        return res.status(400).send('Recebido um array vazio')
    }

    console.log(`[INFO] Rebeidos ${data.length} logs de mac=${data[0]['mac']} ip=${data[0]['ip']}`);
    const result = await insertLog(data);
    res.json({'MESSAGE': `SUCESSO`});
})

export default router;