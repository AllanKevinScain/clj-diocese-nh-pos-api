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

routes.post('/', authMiddleware, roleMiddleware([]), createUserController);
routes.get('/:id', authMiddleware, roleMiddleware(['admin']), getUserController);
routes.put('/:id', authMiddleware, roleMiddleware(['admin']), putUserController);
routes.delete('/:id', authMiddleware, roleMiddleware(['admin']), deleteUserController);

//list
routes.get('/', authMiddleware, roleMiddleware(['admin']), listUsersController);

export { routes as userRoutes };
