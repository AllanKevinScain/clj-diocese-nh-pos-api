import { getRecordController, deleteRecordController } from '../../controllers';

import { Router } from 'express';
import { authMiddleware, roleMiddleware } from '../../middleware';

const routes = Router();

routes.get('/:id', authMiddleware, roleMiddleware(['manager', 'admin']), getRecordController);
routes.delete('/:id', authMiddleware, roleMiddleware(['manager', 'admin']), deleteRecordController);

export { routes as genericRoutes };
