import { Router } from 'express';

import { filterRecordsController } from '@/controllers';
import { authMiddleware, roleMiddleware } from '@/middleware';

const routes = Router();

routes.get(
  '/records-filter',
  authMiddleware,
  roleMiddleware(['admin', 'manager', 'builder-manager']),
  filterRecordsController,
);

export { routes as listRoutes };
