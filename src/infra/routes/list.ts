import { Router } from 'express';
import { filterRecordsController } from '../../controllers';
import { authMiddleware, roleMiddleware } from '../../middleware';

const routes = Router();

// filtro geral das fichas
routes.get(
  '/records-filter',
  authMiddleware,
  roleMiddleware(['admin', 'manager']),
  filterRecordsController,
);

export { routes as listRoutes };
