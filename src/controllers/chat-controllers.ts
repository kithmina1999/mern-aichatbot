import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import OpenAI from "openai";
import { ChatCompletionMessageParam, Completions } from "openai/resources/index.mjs";


export const generateChatCompletion = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { message } = req.body;
    try {

        const user = await User.findById(res.locals.jwtData.id);
        if (!user) return res.status(401).json({ message: "User not registered or Token malfunctioned" });
        //grab chats of he user

        const chats = user.chats.map(({ role, content }) => ({ role, content })) as ChatCompletionMessageParam[];
        chats.push({ content: message, role: "user" });
        user.chats.push({ content: message, role: "user" })

        //send all chats with new one to OpenAI API


        const openai = new OpenAI({
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


    } catch (error) {
        console.log(error);
        return res.status(200).json({ message: "Something went wrong" });

    }

};