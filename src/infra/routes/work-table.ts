import {
  createWorkTableController,
  putWorkTableController,
  getWorkTableController,
  deleteWorkTableController,
} from '../../controllers';

import { Router } from 'express';
import { authMiddleware, roleMiddleware } from '../../middleware';

const routes = Router();

routes.post('/', authMiddleware, roleMiddleware(['manager', 'admin']), createWorkTableController);
routes.get(
  '/:courseNumber',
  authMiddleware,
  roleMiddleware(['manager', 'admin']),
  getWorkTableController,
);
routes.put('/:id', authMiddleware, roleMiddleware(['manager', 'admin']), putWorkTableController);
routes.delete(
  '/:id',
  authMiddleware,
  roleMiddleware(['manager', 'admin']),
  deleteWorkTableController,
);

export { routes as workTableRoutes };
