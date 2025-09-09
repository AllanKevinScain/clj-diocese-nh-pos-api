import {
  createWorkTableController,
  putWorkTableController,
  getWorkTableController,
  deleteWorkTableController,
  getWorkTableArchiveDataController,
} from '../../controllers';

import { Router } from 'express';
import { authMiddleware, roleMiddleware } from '../../middleware';

const routes = Router();

routes.post(
  '/',
  authMiddleware,
  roleMiddleware(['builder-manager', 'admin']),
  createWorkTableController,
);
routes.get(
  '/:courseNumber',
  authMiddleware,
  roleMiddleware(['builder-manager', 'admin']),
  getWorkTableController,
);
routes.put(
  '/:id',
  authMiddleware,
  roleMiddleware(['builder-manager', 'admin']),
  putWorkTableController,
);
routes.delete(
  '/:id',
  authMiddleware,
  roleMiddleware(['builder-manager', 'admin']),
  deleteWorkTableController,
);
routes.get(
  '/archive-data/:courseNumber',
  authMiddleware,
  roleMiddleware(['builder-manager', 'admin']),
  getWorkTableArchiveDataController,
);

export { routes as workTableRoutes };
