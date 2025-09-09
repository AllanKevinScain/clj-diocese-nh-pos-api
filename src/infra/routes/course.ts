import {
  createCourseController,
  getCourseController,
  putCourseController,
  deleteCourseController,
  listCoursesController,
} from '../../controllers';

import { Router } from 'express';
import { authMiddleware, roleMiddleware } from '../../middleware';

const routes = Router();

routes.post('/', authMiddleware, roleMiddleware(['admin']), createCourseController);
routes.get('/:id', authMiddleware, roleMiddleware(['admin']), getCourseController);
routes.put('/:id', authMiddleware, roleMiddleware(['admin']), putCourseController);
routes.delete('/:courseNumber', authMiddleware, roleMiddleware(['admin']), deleteCourseController);

routes.get(
  '/',
  authMiddleware,
  roleMiddleware(['manager', 'builder-manager', 'admin']),
  listCoursesController,
);

export { routes as courseRoutes };
