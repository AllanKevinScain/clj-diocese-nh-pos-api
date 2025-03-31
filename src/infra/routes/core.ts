import { Router } from 'express';
import { listRecordController, listRecordsByCourseNumberController } from '../../controllers';
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

routes.get(
  '/courses/:courseNumber',
  authMiddleware,
  roleMiddleware(['admin']),
  listRecordsByCourseNumberController,
);

export { routes as coreRoutes };
