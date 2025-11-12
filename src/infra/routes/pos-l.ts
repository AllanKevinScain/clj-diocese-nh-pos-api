import {
  createRecordPoslController,
  putRecordPoslController,
  deleteRecordPOSlController,
  getRecordPOSlController,
} from '../../controllers';

import { Router } from 'express';
import { authMiddleware, roleMiddleware } from '../../middleware';

const routes = Router();

routes.post('/', authMiddleware, roleMiddleware(['manager', 'admin']), createRecordPoslController);
routes.get('/:id', authMiddleware, roleMiddleware(['manager', 'admin']), getRecordPOSlController);
routes.put('/:id', authMiddleware, roleMiddleware(['manager', 'admin']), putRecordPoslController);

routes.delete('/:id', authMiddleware, roleMiddleware(['admin']), deleteRecordPOSlController);

export { routes as poslRoutes };
