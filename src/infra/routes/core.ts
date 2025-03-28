import { Router } from 'express';
import { listRecordController } from '../../controllers';
import { loginController } from '../../controllers';
import { authMiddleware, roleMiddleware } from '../../middleware';

const routes = Router();

routes.post('/login', loginController);

routes.get(
  '/records/:typeOfRecord',
  authMiddleware,
  roleMiddleware(['admin', 'manager']),
  listRecordController,
);

export { routes as coreRoutes };
