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
routes.get('/:id', authMiddleware, roleMiddleware(['admin', 'manager']), getPoslllController);
routes.put('/:id', authMiddleware, roleMiddleware(['admin']), putPoslllController);
routes.delete('/:id', authMiddleware, roleMiddleware(['admin']), deletePoslllController);

//list
routes.get('/', authMiddleware, roleMiddleware(['admin', 'manager']), listPoslllController);

export { routes as poslllRoutes };
