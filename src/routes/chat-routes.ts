import { Router } from "express";
import { verifyToken } from "../utils/token-manager";
import { chatCompletionValidator, validate } from "../utils/validators";
import { generateChatCompletion } from "../controllers/chat-controllers";

//protected api
const chatRoutes = Router();
chatRoutes.post(
    "/new",
    validate(chatCompletionValidator),
    verifyToken,
    generateChatCompletion);

export default chatRoutes;