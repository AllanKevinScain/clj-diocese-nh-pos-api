/* user */
import {
  createUserController,
  deleteUserController,
  getUserController,
  putUserController,
  listUsersController,
} from '../../controllers';

import { Router } from 'express';
import { authMiddleware, roleMiddleware } from '../../middleware';

const routes = Router();

routes.post(
  '/',
  (_req, _res, next) => next(),
  (_req, _res, next) => next(),
  createUserController,
);

routes.get('/', authMiddleware, roleMiddleware(['admin']), listUsersController);
routes.get('/:id', authMiddleware, roleMiddleware(['admin']), getUserController);
routes.put('/:id', authMiddleware, roleMiddleware(['admin']), putUserController);
routes.delete('/:id', authMiddleware, roleMiddleware(['admin']), deleteUserController);

export { routes as userRoutes };
