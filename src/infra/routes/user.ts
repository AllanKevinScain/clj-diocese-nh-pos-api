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

routes.get('/', authMiddleware, roleMiddleware(['admin']), listUsersController);
routes.post('/', authMiddleware, roleMiddleware([]), createUserController);
routes.get('/:id', authMiddleware, roleMiddleware(['admin']), getUserController);
routes.put('/:id', authMiddleware, roleMiddleware(['admin']), putUserController);
routes.delete('/:id', authMiddleware, roleMiddleware(['admin']), deleteUserController);

//list

export { routes as userRoutes };
