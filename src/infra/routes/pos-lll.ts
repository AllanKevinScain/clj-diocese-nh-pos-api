import {
  createPoslllController,
  deletePoslllController,
  getPoslllController,
  listPoslllController,
  putPoslllController,
} from '../../controllers';

import { Router } from 'express';
import { authMiddleware, roleMiddleware } from '../../middleware';

const routes = Router();

routes.post('/', authMiddleware, roleMiddleware(['admin']), createPoslllController);
routes.get(
  '/:id',
  authMiddleware,
  roleMiddleware(['manager', 'builder-manager', 'admin']),
  getPoslllController,
);
routes.put('/:id', authMiddleware, roleMiddleware(['admin']), putPoslllController);
routes.delete('/:id', authMiddleware, roleMiddleware(['admin']), deletePoslllController);

routes.get(
  '/',
  authMiddleware,
  roleMiddleware(['manager', 'builder-manager', 'admin']),
  listPoslllController,
);

export { routes as poslllRoutes };
