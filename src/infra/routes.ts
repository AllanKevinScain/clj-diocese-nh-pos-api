/* user */
import {
  createUserController,
  deleteUserController,
  getUserController,
  putUserController,
} from '../controllers';

/* pos1 */
import {
  createRecordPOSlController,
  getRecordPOSlController,
  putRecordPOSlController,
  deleteRecordPOSlController,
} from '../controllers';

/* pos2 */
import {
  createRecordPOSllController,
  getRecordPOSllController,
  putRecordPOSllController,
  deleteRecordPOSllController,
} from '../controllers';

/* trabalho */
import { createWorkController, getWorkController, putWorkController } from '../controllers';
import { Router } from 'express';

const routes = Router();

// CRUD fixas pos 1
routes.post('/record/register/posl', createRecordPOSlController);
routes.get('/record/register/posl/:id', getRecordPOSlController);
routes.put('/record/register/posl/:id', putRecordPOSlController);
routes.delete('/record/register/posl/:id', deleteRecordPOSlController);

// CRUD fixas pos 2
routes.post('/record/register/posll', createRecordPOSllController);
routes.get('/record/register/posll/:id', getRecordPOSllController);
routes.put('/record/register/posll/:id', putRecordPOSllController);
routes.delete('/record/register/posll/:id', deleteRecordPOSllController);

// CRUD fixas trabalho
routes.post('/record/register/work', createWorkController);
routes.get('/record/register/work/:id', getWorkController);
routes.put('/record/register/work/:id', putWorkController);
routes.delete('/record/register/work/:id', () => Promise.resolve());

// CRUD usuarios
routes.post('/user/register', createUserController);
routes.get('/user/register/:id', getUserController);
routes.put('/user/register/:id', putUserController);
routes.delete('/user/register/:id', deleteUserController);

export { routes };
