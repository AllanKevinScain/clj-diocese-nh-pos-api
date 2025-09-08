import { getRecordByIdController } from '../../controllers';

import { Router } from 'express';
import { authMiddleware, roleMiddleware } from '../../middleware';

const routes = Router();

routes.get('/:id', authMiddleware, roleMiddleware(['manager', 'admin']), getRecordByIdController);

export { routes as recordByIdRoute };
