import express from 'express';
import logRoutes from './routes/logRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();
const port = 3000;

app.use(express.json());

app.use('/log', logRoutes);
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.json({'MESSAGE': 'Foi'});
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})
