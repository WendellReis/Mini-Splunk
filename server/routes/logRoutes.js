import express from 'express';
import { insertLogs, getLogs } from '../repositories/logRepository.js';

const router = express.Router()

router.post('/', async (req, res) => {
    const data = req.body;

    if (!Array.isArray(data)) {
        return res.status(400).json({
            success: false,
            error: 'INVALID_PAYLOAD'
        });
    } else if (data.length == 0) {
        return res.status(400).json({
            success: false,
            error: 'EMPTY_ARRAY'
        });
    }

    console.log(`[INFO] Rebeidos ${data.length} logs de mac=${data[0]['mac'] || 'N/A'} ip=${data[0]['ip'] || 'N/A'}`);

    const result = await insertLogs(data);

    if (!result.success) {
        return res.status(500).json({
            success: false,
            message: 'Erro ao inserir logs',
        });
    }

    return res.status(201).json({
        success: true,
        message: 'Logs inseridos com sucesso',
        count: data.length
    });
});

router.get('/', async (req, res) => {
    const result = await getLogs();

    if (!result.success) {
        return res.status(500).json({
            success: false,
            message: 'Erro ao buscar logs'
        });
    }

    return res.status(200).json({
        success: true,
        data: result.data
    });
});

export default router;