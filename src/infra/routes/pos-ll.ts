import {
  createRecordPosllController,
  putRecordPosllController,
  deleteRecordPOSllController,
} from '../../controllers';

import { Router } from 'express';
import { authMiddleware, roleMiddleware } from '../../middleware';

const routes = Router();

routes.post('/', authMiddleware, roleMiddleware(['manager', 'admin']), createRecordPosllController);
routes.put('/:id', authMiddleware, roleMiddleware(['manager', 'admin']), putRecordPosllController);
routes.delete(
  '/:id',
  authMiddleware,
  roleMiddleware(['manager', 'admin']),
  deleteRecordPOSllController,
);

export { routes as posllRoutes };
