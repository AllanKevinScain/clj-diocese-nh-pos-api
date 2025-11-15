import {
  createRecordPoslController,
  putRecordPoslController,
  deleteRecordPOSlController,
} from '../../controllers';

import { Router } from 'express';
import { authMiddleware, roleMiddleware } from '../../middleware';

const routes = Router();

routes.post('/', authMiddleware, roleMiddleware(['manager', 'admin']), createRecordPoslController);
routes.put('/:id', authMiddleware, roleMiddleware(['manager', 'admin']), putRecordPoslController);

routes.delete('/:id', authMiddleware, roleMiddleware(['admin']), deleteRecordPOSlController);

export { routes as poslRoutes };
