import { Router } from 'express';

import {
  createWorkTableController,
  deleteWorkTableController,
  getWorkTableArchiveDataController,
  getWorkTableController,
  putWorkTableController,
} from '@/controllers';
import { authMiddleware, roleMiddleware } from '@/middleware';

const routes = Router();

routes.post(
  '/',
  authMiddleware,
  roleMiddleware(['builder-manager', 'admin']),
  createWorkTableController,
);
routes.get(
  '/:courseId',
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
  '/archive-data/:courseId',
  authMiddleware,
  roleMiddleware(['builder-manager', 'admin']),
  getWorkTableArchiveDataController,
);

export { routes as workTableRoutes };
