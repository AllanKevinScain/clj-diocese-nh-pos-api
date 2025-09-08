import express from 'express';
import cors from 'cors';

import { userRoutes } from './routes/user';
import { poslRoutes } from './routes/pos-l';
import { posllRoutes } from './routes/pos-ll';
import { workRoutes } from './routes/work';
import { coupleRoutes } from './routes/couple';
import { listRoutes } from './routes/list';
import { courseRoutes } from './routes/course';
import { authRoutes } from './routes/auth';
import { poslllRoutes } from './routes/pos-lll';
import { workTableRoutes } from './routes/work-table';
import { recordByIdRoute } from './routes/record';

const server = express();

server.use(cors());
server.use(express.json());

server.use((req, _, next) => {
  console.log(`🔁 ${req.method} ${req.originalUrl} - ${new Date().toISOString()}`);
  next();
});

server.use('/auth', authRoutes);
server.use('/user', userRoutes);
server.use('/record', recordByIdRoute);
server.use('/records/posl', poslRoutes);
server.use('/records/posll', posllRoutes);
server.use('/records/work', workRoutes);
server.use('/records/couple', coupleRoutes);
server.use('/course', courseRoutes);
server.use('/list', listRoutes);
server.use('/poslll', poslllRoutes);
server.use('/work-table', workTableRoutes);

export default server;
