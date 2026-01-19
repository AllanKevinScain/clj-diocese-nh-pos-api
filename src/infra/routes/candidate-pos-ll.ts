import { Router } from 'express';

import { createRecordPosllController, putRecordPosllController } from '@/controllers';
import { authMiddleware, roleMiddleware } from '@/middleware';

const routes = Router();

routes.post('/', authMiddleware, roleMiddleware(['manager', 'admin']), createRecordPosllController);
routes.put('/:id', authMiddleware, roleMiddleware(['manager', 'admin']), putRecordPosllController);

export { routes as candidatePosllRoutes };
