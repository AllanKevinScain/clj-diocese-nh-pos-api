import {
  createRecordPOSllController,
  getRecordPOSllController,
  putRecordPOSllController,
  deleteRecordPOSllController,
} from '../../controllers';

import { Router } from 'express';
import { authMiddleware, roleMiddleware } from '../../middleware';

const routes = Router();

routes.post('/', authMiddleware, roleMiddleware(['manager', 'admin']), createRecordPOSllController);
routes.get('/:id', authMiddleware, roleMiddleware(['manager', 'admin']), getRecordPOSllController);
routes.put('/:id', authMiddleware, roleMiddleware(['manager', 'admin']), putRecordPOSllController);
routes.delete(
  '/:id',
  authMiddleware,
  roleMiddleware(['manager', 'admin']),
  deleteRecordPOSllController,
);

export { routes as poslRoutes };
