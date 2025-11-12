import {
  createRecordPosllController,
  getRecordPOSllController,
  putRecordPosllController,
  deleteRecordPOSllController,
} from '../../controllers';

import { Router } from 'express';
import { authMiddleware, roleMiddleware } from '../../middleware';

const routes = Router();

routes.post('/', authMiddleware, roleMiddleware(['manager', 'admin']), createRecordPosllController);
routes.get('/:id', authMiddleware, roleMiddleware(['manager', 'admin']), getRecordPOSllController);
routes.put('/:id', authMiddleware, roleMiddleware(['manager', 'admin']), putRecordPosllController);
routes.delete(
  '/:id',
  authMiddleware,
  roleMiddleware(['manager', 'admin']),
  deleteRecordPOSllController,
);

export { routes as posllRoutes };
