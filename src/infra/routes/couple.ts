import {
  createCoupleController,
  getCoupleController,
  putCoupleController,
  deleteCoupleController,
} from '../../controllers';

import { Router } from 'express';
import { authMiddleware, roleMiddleware } from '../../middleware';

const routes = Router();

routes.post(
  '/',
  authMiddleware,
  roleMiddleware(['manager', 'builder-manager', 'admin']),
  createCoupleController,
);
routes.get(
  '/:id',
  authMiddleware,
  roleMiddleware(['manager', 'builder-manager', 'admin']),
  getCoupleController,
);
routes.put(
  '/:id',
  authMiddleware,
  roleMiddleware(['manager', 'builder-manager', 'admin']),
  putCoupleController,
);
routes.delete(
  '/:id',
  authMiddleware,
  roleMiddleware(['manager', 'builder-manager', 'admin']),
  deleteCoupleController,
);

export { routes as coupleRoutes };
