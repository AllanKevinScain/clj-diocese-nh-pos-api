import express from 'express';
import cors from 'cors';
import { userRoutes } from './routes/user';
import { poslRoutes } from './routes/pos-l';
import { posllRoutes } from './routes/pos-ll';
import { workRoutes } from './routes/work';
import { coupleRoutes } from './routes/couple';
import { coreRoutes } from './routes/core';
import { courseRoutes } from './routes/course';
import { authRoutes } from './routes/auth';

const server = express();

server.use(cors());
server.use(express.json());

server.use(authRoutes);

server.use('/user', userRoutes);
server.use('/records/posl', poslRoutes);
server.use('/records/posll', posllRoutes);
server.use('/records/work', workRoutes);
server.use('/records/couple', coupleRoutes);
server.use('/course', courseRoutes);

server.use(coreRoutes);

export default server;
