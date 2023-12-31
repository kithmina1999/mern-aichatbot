"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateChatCompletion = void 0;
const User_1 = __importDefault(require("../models/User"));
const openai_1 = __importDefault(require("openai"));
const generateChatCompletion = async (req, res, next) => {
    const { message } = req.body;
    try {
        const user = await User_1.default.findById(res.locals.jwtData.id);
        if (!user)
            return res.status(401).json({ message: "User not registered or Token malfunctioned" });
        //grab chats of he user
        const chats = user.chats.map(({ role, content }) => ({ role, content }));
        chats.push({ content: message, role: "user" });
        user.chats.push({ content: message, role: "user" });
        //send all chats with new one to OpenAI API
        const openai = new openai_1.default({
            apiKey: process.env.OPENAI_API_KEY,
            organization: process.env.OPENAI_ORGANIZATION_ID,
        });
        const chatResponse = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: chats,
        });
        user.chats.push(chatResponse.choices[0].message);
        await user.save();
        return res.status(200).json({ chats: user.chats });
        //get latest response
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "Something went wrong" });
    }
};
exports.generateChatCompletion = generateChatCompletion;
//# sourceMappingURL=chat-controllers.js.map