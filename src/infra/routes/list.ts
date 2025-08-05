import { Router } from 'express';
import {
  filterRecordsController,
  listRecordController,
  listRecordsByCourseNumberController,
} from '../../controllers';
import { authMiddleware, roleMiddleware } from '../../middleware';

const routes = Router();

// lista por tipo de ficha
routes.get(
  '/records-by-type/:typeOfRecord',
  authMiddleware,
  roleMiddleware(['admin', 'manager']),
  listRecordController,
);

// lista por número de curso
routes.get(
  '/records-by-number/:courseNumber',
  authMiddleware,
  roleMiddleware(['admin']),
  listRecordsByCourseNumberController,
);

// filtro geral das fichas
routes.get(
  '/records-filter',
  authMiddleware,
  roleMiddleware(['admin', 'manager']),
  filterRecordsController,
);

export { routes as listRoutes };
