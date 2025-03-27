/* user */
import {
  createUserController,
  deleteUserController,
  getUserController,
  putUserController,
  listUsersController,
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
import {
  createWorkController,
  getWorkController,
  putWorkController,
  deleteWorkController,
} from '../controllers';

/* casal */
import {
  createCoupleController,
  getCoupleController,
  putCoupleController,
  deleteCoupleController,
} from '../controllers';
import { Router } from 'express';
import { listRecordController } from '../controllers';
import { loginController } from '../controllers';
import { authMiddleware } from '../controllers/login/middleware';

const routes = Router();

// login
routes.post('/login', loginController);

// listar fixas
routes.get('/records/:typeOfRecord', authMiddleware, listRecordController);

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
routes.delete('/record/register/work/:id', deleteWorkController);

// CRUD fixas trabalho
routes.post('/record/register/couple', createCoupleController);
routes.get('/record/register/couple/:id', getCoupleController);
routes.put('/record/register/couple/:id', putCoupleController);
routes.delete('/record/register/couple/:id', deleteCoupleController);

// CRUD usuarios
routes.post('/user/register', createUserController);
routes.get('/user/register/:id', getUserController);
routes.put('/user/register/:id', putUserController);
routes.delete('/user/register/:id', deleteUserController);
routes.get('/users', listUsersController);

export { routes };
