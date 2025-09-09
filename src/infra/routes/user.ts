/* user */
import {
  createUserController,
  deleteUserController,
  getUserController,
  putUserController,
  listUsersController,
} from '../../controllers';

import { Router } from 'express';
import { authMiddleware, authMiddlewareSpecial, roleMiddleware } from '../../middleware';

const routes = Router();

routes.post('/', authMiddleware, roleMiddleware(['admin']), createUserController);
routes.get('/', authMiddleware, roleMiddleware(['admin']), listUsersController);
routes.get('/:id', authMiddleware, roleMiddleware(['admin']), getUserController);
routes.put('/:id', authMiddleware, roleMiddleware(['admin']), putUserController);
routes.delete('/:id', authMiddleware, roleMiddleware(['admin']), deleteUserController);

routes.post('/special', authMiddlewareSpecial, createUserController);

export { routes as userRoutes };
