/* user */
import {
  createUserController,
  deleteUserController,
  getUserController,
  putUserController,
  listUsersController,
  putPasswordUserController,
} from '../../controllers';

import { Router } from 'express';
import { authMiddleware, authMiddlewareSpecial, roleMiddleware } from '../../middleware';

const routes = Router();

routes.post('/', authMiddleware, roleMiddleware(['admin']), createUserController);
routes.get('/:id', authMiddleware, roleMiddleware(['admin']), getUserController);
routes.put('/:id', authMiddleware, roleMiddleware(['admin']), putUserController);
routes.delete('/:id', authMiddleware, roleMiddleware(['admin']), deleteUserController);

routes.get('/', authMiddleware, roleMiddleware(['admin']), listUsersController);
routes.put('/password/:id', authMiddleware, roleMiddleware(['admin']), putPasswordUserController);

routes.post('/special', authMiddlewareSpecial, createUserController);

export { routes as userRoutes };
