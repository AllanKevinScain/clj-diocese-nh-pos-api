import {
  createUserController,
  deleteUserController,
  getUserController,
  putUserController,
} from '../controllers';
import {
  createRecordPOSlController,
  getRecordPOSlController,
  putRecordPOSlController,
  deleteRecordPOSlController,
} from '../controllers';
import { Router } from 'express';

const routes = Router();

// CRUD fixas pos 1
routes.post('/record/register/posl', createRecordPOSlController);
routes.get('/record/register/posl/:id', getRecordPOSlController);
routes.put('/record/register/posl/:id', putRecordPOSlController);
routes.delete('/record/register/posl/:id', deleteRecordPOSlController);

// CRUD usuarios
routes.post('/user/register', createUserController);
routes.get('/user/register/:id', getUserController);
routes.put('/user/register/:id', putUserController);
routes.delete('/user/register/:id', deleteUserController);

export { routes };
