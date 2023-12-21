import {Router} from 'express'
import chatRoutes from './chat-routes';
import userRoutes from './user-routes';

const appRouter = Router();

appRouter.use("/user", userRoutes); //domain/api/v1
appRouter.use("/chats", chatRoutes);

export default appRouter;