import express from 'express';
import cors from 'cors';

import { userRoutes } from './routes/user';
import { poslRoutes } from './routes/pos-l';
import { posllRoutes } from './routes/pos-ll';
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
server.use('/records/posl', poslRoutes);
server.use('/records/posll', posllRoutes);
server.use('/records', genericRoutes);
server.use('/course', courseRoutes);
server.use('/list', listRoutes);
server.use('/poslll', poslllRoutes);
server.use('/work-table', workTableRoutes);

export default server;
