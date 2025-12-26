import {
  createPoslllController,
  changeActivationPoslllController,
  getPoslllController,
  listPoslllController,
  putPoslllController,
  listPoslllByIdsController,
} from '../../controllers';

import { Router } from 'express';
import { authMiddleware, roleMiddleware } from '../../middleware';

const routes = Router();

routes.post('/', authMiddleware, roleMiddleware(['admin']), createPoslllController);
routes.get('/:id', authMiddleware, roleMiddleware(['admin']), getPoslllController);
routes.put('/:id', authMiddleware, roleMiddleware(['admin']), putPoslllController);

// "delete"
routes.patch('/:id', authMiddleware, roleMiddleware(['admin']), changeActivationPoslllController);

routes.get(
  '/',
  authMiddleware,
  roleMiddleware(['manager', 'builder-manager', 'admin']),
  listPoslllController,
);

routes.post(
  '/list-records-by-ids',
  authMiddleware,
  roleMiddleware(['builder-manager', 'admin']),
  listPoslllByIdsController,
);

export { routes as poslllRoutes };
