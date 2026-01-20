import { Router } from 'express';

import {
  deleteRecordController,
  getRecordController,
  listRecordByCourseIdController,
} from '@/controllers';
import { authMiddleware, roleMiddleware } from '@/middleware';

const routes = Router();

routes.get('/:id', authMiddleware, roleMiddleware(['manager', 'admin']), getRecordController);
routes.get(
  '/list-course/:id',
  authMiddleware,
  roleMiddleware(['builder-manager', 'admin']),
  listRecordByCourseIdController,
);
routes.delete('/:id', authMiddleware, roleMiddleware(['manager', 'admin']), deleteRecordController);

export { routes as genericRoutes };
