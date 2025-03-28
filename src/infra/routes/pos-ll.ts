import {
  createRecordPOSlController,
  getRecordPOSlController,
  putRecordPOSlController,
  deleteRecordPOSlController,
} from '../../controllers';

import { Router } from 'express';
import { authMiddleware, roleMiddleware } from '../../middleware';

const routes = Router();

routes.post('/', authMiddleware, roleMiddleware(['manager', 'admin']), createRecordPOSlController);
routes.get('/:id', authMiddleware, roleMiddleware(['manager', 'admin']), getRecordPOSlController);
routes.put('/:id', authMiddleware, roleMiddleware(['manager', 'admin']), putRecordPOSlController);
routes.delete(
  '/:id',
  authMiddleware,
  roleMiddleware(['manager', 'admin']),
  deleteRecordPOSlController,
);

export { routes as posllRoutes };
