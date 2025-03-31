import {
  createCourseController,
  getCourseController,
  putCourseController,
  deleteCourseController,
} from '../../controllers';

import { Router } from 'express';
import { authMiddleware, roleMiddleware } from '../../middleware';

const routes = Router();

routes.post('/', authMiddleware, roleMiddleware(['admin']), createCourseController);
routes.get('/:id', authMiddleware, roleMiddleware(['admin']), getCourseController);
routes.put('/:id', authMiddleware, roleMiddleware(['admin']), putCourseController);
routes.delete('/:id', authMiddleware, roleMiddleware(['admin']), deleteCourseController);

export { routes as courseRoutes };
