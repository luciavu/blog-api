import { Router } from 'express';
import authRoutes from './auth.routes';
import postRoutes from './posts.routes';
import commentRoutes from './comments.routes';

const apiRouter = Router();

apiRouter.use('/auth', authRoutes); // /api/auth
apiRouter.use('/posts', postRoutes); // api/posts
apiRouter.use('/', commentRoutes); // api/(posts/:id)

export default apiRouter;
