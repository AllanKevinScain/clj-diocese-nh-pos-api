import { Router } from 'express';
import { listRecordController, listRecordsByCourseNumberController } from '../../controllers';
import { loginController } from '../../controllers';
import { authMiddleware, roleMiddleware } from '../../middleware';

const routes = Router();

routes.post('/login', loginController);

routes.get(
  '/records-by-type/:typeOfRecord',
  authMiddleware,
  roleMiddleware(['admin', 'manager']),
  listRecordController,
);

routes.get(
  '/records-by-number/:courseNumber',
  authMiddleware,
  roleMiddleware(['admin']),
  listRecordsByCourseNumberController,
);

export { routes as coreRoutes };
