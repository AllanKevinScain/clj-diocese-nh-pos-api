import express from 'express';
import cors from 'cors';

import { userRoutes } from './routes/user';
import { candidatePoslRoutes } from './routes/candidate-pos-l';
import { candidatePosllRoutes } from './routes/candidate-pos-ll';
import { candidatePoslllRoutes } from './routes/candidate-pos-lll';
import { listRoutes } from './routes/list';
import { courseRoutes } from './routes/course';
import { authRoutes } from './routes/auth';
import { poslllRoutes } from './routes/pos-lll';
import { workTableRoutes } from './routes/work-table';
import { genericRoutes } from './routes/generic';

const server = express();

server.use(cors({ origin: '*' }));
server.use(express.json());

server.get('/', (_, res) => {
  res.send({ message: '🚀 ~ api está em órbita!' });
});

server.use((req, _, next) => {
  console.log(`🔁 ${req.method} ${req.originalUrl} - ${new Date().toISOString()}`);
  next();
});

server.use('/auth', authRoutes);
server.use('/user', userRoutes);
server.use('/records/posl', candidatePoslRoutes);
server.use('/records/posll', candidatePosllRoutes);
server.use('/records/poslll', candidatePoslllRoutes);
server.use('/records', genericRoutes);
server.use('/course', courseRoutes);
server.use('/list', listRoutes);
server.use('/poslll', poslllRoutes);
server.use('/work-table', workTableRoutes);

export default server;
