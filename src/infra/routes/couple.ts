import {
  createCoupleController,
  getCoupleController,
  putCoupleController,
  deleteCoupleController,
} from '../../controllers';

import { Router } from 'express';
import { authMiddleware, roleMiddleware } from '../../middleware';

const routes = Router();

routes.post('/', authMiddleware, roleMiddleware(['manager', 'admin']), createCoupleController);
routes.get('/:id', authMiddleware, roleMiddleware(['manager', 'admin']), getCoupleController);
routes.put('/:id', authMiddleware, roleMiddleware(['manager', 'admin']), putCoupleController);
routes.delete('/:id', authMiddleware, roleMiddleware(['manager', 'admin']), deleteCoupleController);

export { routes as coupleRoutes };
