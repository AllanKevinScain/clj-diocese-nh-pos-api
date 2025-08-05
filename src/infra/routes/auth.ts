import { Router } from 'express';
import { loginController, refreshTokenController } from '../../controllers';

const routes = Router();

routes.post('/', loginController);
routes.post('/refresh-token', refreshTokenController);

export { routes as authRoutes };
