import {
  createWorkController,
  getWorkController,
  putWorkController,
  deleteWorkController,
} from '../../controllers';

import { Router } from 'express';
import { authMiddleware, roleMiddleware } from '../../middleware';

const routes = Router();

routes.post('/', authMiddleware, roleMiddleware(['manager', 'admin']), createWorkController);
routes.get('/:id', authMiddleware, roleMiddleware(['manager', 'admin']), getWorkController);
routes.put('/:id', authMiddleware, roleMiddleware(['manager', 'admin']), putWorkController);
routes.delete('/:id', authMiddleware, roleMiddleware(['manager', 'admin']), deleteWorkController);

export { routes as workRoutes };
