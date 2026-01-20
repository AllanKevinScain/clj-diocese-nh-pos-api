import { Router } from 'express';

import {
  createCourseController,
  deleteCourseController,
  getCourseController,
  listCoursesController,
  putCourseController,
} from '@/controllers';
import { authMiddleware, roleMiddleware } from '@/middleware';

const routes = Router();

routes.post('/', authMiddleware, roleMiddleware(['admin']), createCourseController);
routes.get(
  '/:id',
  authMiddleware,
  roleMiddleware(['admin', 'builder-manager']),
  getCourseController,
);
routes.put('/:id', authMiddleware, roleMiddleware(['admin']), putCourseController);
routes.delete('/:courseNumber', authMiddleware, roleMiddleware(['admin']), deleteCourseController);

routes.get(
  '/',
  authMiddleware,
  roleMiddleware(['manager', 'builder-manager', 'admin']),
  listCoursesController,
);

export { routes as courseRoutes };
