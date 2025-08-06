import { createPeapleCljThreeController } from '../../controllers';

import { Router } from 'express';
import { authMiddleware, roleMiddleware } from '../../middleware';

const routes = Router();

routes.post(
  '/',
  authMiddleware,
  roleMiddleware(['admin', 'manager']),
  createPeapleCljThreeController,
);
// routes.get('/:id', authMiddleware, roleMiddleware(['admin']), getCourseController);
// routes.put('/:id', authMiddleware, roleMiddleware(['admin']), putCourseController);
// routes.delete('/:id', authMiddleware, roleMiddleware(['admin']), deleteCourseController);

//list
// routes.get('/', authMiddleware, roleMiddleware(['admin']), listCoursesController);

export { routes as peapleCljThreeRoutes };
