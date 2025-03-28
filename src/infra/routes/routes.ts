/* user */
import {
  createUserController,
  deleteUserController,
  getUserController,
  putUserController,
  listUsersController,
} from '../../controllers';

/* pos1 */
import {
  createRecordPOSlController,
  getRecordPOSlController,
  putRecordPOSlController,
  deleteRecordPOSlController,
} from '../../controllers';

/* pos2 */
import {
  createRecordPOSllController,
  getRecordPOSllController,
  putRecordPOSllController,
  deleteRecordPOSllController,
} from '../../controllers';

/* trabalho */
import {
  createWorkController,
  getWorkController,
  putWorkController,
  deleteWorkController,
} from '../../controllers';

/* casal */
import {
  createCoupleController,
  getCoupleController,
  putCoupleController,
  deleteCoupleController,
} from '../../controllers';
import { Router } from 'express';
import { listRecordController } from '../../controllers';
import { loginController } from '../../controllers';
import { authMiddleware, roleMiddleware } from '../../middleware';

const routes = Router();

// login
routes.post('/login', loginController);

// listar fixas
routes.get(
  '/records/:typeOfRecord',
  authMiddleware,
  roleMiddleware(['admin', 'manager']),
  listRecordController,
);

// CRUD fixas pos 1
routes.post(
  '/record/register/posl',
  authMiddleware,
  roleMiddleware(['manager', 'admin']),
  createRecordPOSlController,
);
routes.get(
  '/record/register/posl/:id',
  authMiddleware,
  roleMiddleware(['manager', 'admin']),
  getRecordPOSlController,
);
routes.put(
  '/record/register/posl/:id',
  authMiddleware,
  roleMiddleware(['manager', 'admin']),
  putRecordPOSlController,
);
routes.delete(
  '/record/register/posl/:id',
  authMiddleware,
  roleMiddleware(['manager', 'admin']),
  deleteRecordPOSlController,
);

// CRUD fixas pos 2
routes.post(
  '/record/register/posll',
  authMiddleware,
  roleMiddleware(['manager', 'admin']),
  createRecordPOSllController,
);
routes.get(
  '/record/register/posll/:id',
  authMiddleware,
  roleMiddleware(['manager', 'admin']),
  getRecordPOSllController,
);
routes.put(
  '/record/register/posll/:id',
  authMiddleware,
  roleMiddleware(['manager', 'admin']),
  putRecordPOSllController,
);
routes.delete(
  '/record/register/posll/:id',
  authMiddleware,
  roleMiddleware(['manager', 'admin']),
  deleteRecordPOSllController,
);

// CRUD fixas trabalho
routes.post(
  '/record/register/work',
  authMiddleware,
  roleMiddleware(['manager', 'admin']),
  createWorkController,
);
routes.get(
  '/record/register/work/:id',
  authMiddleware,
  roleMiddleware(['manager', 'admin']),
  getWorkController,
);
routes.put(
  '/record/register/work/:id',
  authMiddleware,
  roleMiddleware(['manager', 'admin']),
  putWorkController,
);
routes.delete(
  '/record/register/work/:id',
  authMiddleware,
  roleMiddleware(['manager', 'admin']),
  deleteWorkController,
);

// CRUD fixas casal
routes.post(
  '/record/register/couple',
  authMiddleware,
  roleMiddleware(['manager', 'admin']),
  createCoupleController,
);
routes.get(
  '/record/register/couple/:id',
  authMiddleware,
  roleMiddleware(['manager', 'admin']),
  getCoupleController,
);
routes.put(
  '/record/register/couple/:id',
  authMiddleware,
  roleMiddleware(['manager', 'admin']),
  putCoupleController,
);
routes.delete(
  '/record/register/couple/:id',
  authMiddleware,
  roleMiddleware(['manager', 'admin']),
  deleteCoupleController,
);

// CRUD usuarios
routes.post('/user/register', authMiddleware, roleMiddleware(['admin']), createUserController);
routes.get('/user/register/:id', authMiddleware, roleMiddleware(['admin']), getUserController);
routes.put('/user/register/:id', authMiddleware, roleMiddleware(['admin']), putUserController);
routes.delete(
  '/user/register/:id',
  authMiddleware,
  roleMiddleware(['admin']),
  deleteUserController,
);
routes.get('/users', authMiddleware, roleMiddleware(['admin']), listUsersController);

export { routes };
