/* user */
import { Router } from 'express';

import {
  changeActivationUserController,
  createUserController,
  getUserController,
  listRegisteredParishesController,
  listUsersController,
  putPasswordUserController,
  putUserController,
} from '@/controllers';
import { authMiddleware, authMiddlewareSpecial, roleMiddleware } from '@/middleware';

const routes = Router();

routes.post('/', authMiddleware, roleMiddleware(['admin']), createUserController);
routes.put('/:id', authMiddleware, roleMiddleware(['admin']), putUserController);

// "delete"
routes.patch('/:id', authMiddleware, roleMiddleware(['admin']), changeActivationUserController);

routes.get(
  '/parishes',
  authMiddleware,
  roleMiddleware(['admin', 'builder-manager', 'manager']),
  listRegisteredParishesController,
);
routes.get('/:id', authMiddleware, roleMiddleware(['admin']), getUserController);
routes.get('/', authMiddleware, roleMiddleware(['admin']), listUsersController);

routes.put('/password/:id', authMiddleware, roleMiddleware(['admin']), putPasswordUserController);

routes.post('/special', authMiddlewareSpecial, createUserController);

export { routes as userRoutes };
