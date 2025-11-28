import { createRecordPoslllController, putRecordPoslllController } from '../../controllers';

import { Router } from 'express';
import { authMiddleware, roleMiddleware } from '../../middleware';

const routes = Router();

routes.post(
  '/',
  authMiddleware,
  roleMiddleware(['manager', 'admin']),
  createRecordPoslllController,
);
routes.put('/:id', authMiddleware, roleMiddleware(['manager', 'admin']), putRecordPoslllController);

export { routes as candidatePoslllRoutes };
