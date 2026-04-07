import express from 'express';
import argon2 from 'argon2';

const router = express.Router()

router.get('/', (req, res) => {
    res.json({'MESSAGE': 'AUTH'});

    try {
        const password = 'test';

        const hash = argon2.hash(password);

        const isValid = argon2.verify(hash, password);

    } catch {

    }
})

export default router;