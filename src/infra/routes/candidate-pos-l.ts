import { createRecordPoslController, putRecordPoslController } from '../../controllers';

import { Router } from 'express';
import { authMiddleware, roleMiddleware } from '../../middleware';

const routes = Router();

routes.post('/', authMiddleware, roleMiddleware(['manager', 'admin']), createRecordPoslController);
routes.put('/:id', authMiddleware, roleMiddleware(['manager', 'admin']), putRecordPoslController);

export { routes as candidatePoslRoutes };
