import { Router } from 'express';
import authRoutes from './auth.routes';
import postRoutes from './posts.routes';
import userRoutes from './user.routes';
import commentRoutes from './comments.routes';
import { getAllComments } from '../controllers/comments.controller';

const apiRouter = Router();

apiRouter.use('/auth', authRoutes); // /api/auth
apiRouter.use('/users', userRoutes); // /api/users
apiRouter.use('/posts', postRoutes); // api/posts
apiRouter.use('/posts', commentRoutes); // api/posts/:id
apiRouter.get('/comments', getAllComments);
export default apiRouter;
