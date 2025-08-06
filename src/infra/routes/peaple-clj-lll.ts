import {
  createPeapleCljThreeController,
  getPeapleCljThreeController,
  listPeapleCljThreeController,
} from '../../controllers';

import { Router } from 'express';
import { authMiddleware, roleMiddleware } from '../../middleware';

const routes = Router();

routes.post('/', authMiddleware, roleMiddleware(['admin']), createPeapleCljThreeController);
routes.get(
  '/:id',
  authMiddleware,
  roleMiddleware(['admin', 'manager']),
  getPeapleCljThreeController,
);
// routes.put('/:id', authMiddleware, roleMiddleware(['admin']), putCourseController);
// routes.delete('/:id', authMiddleware, roleMiddleware(['admin']), deleteCourseController);

//list
routes.get('/', authMiddleware, roleMiddleware(['admin', 'manager']), listPeapleCljThreeController);

export { routes as peapleCljThreeRoutes };
