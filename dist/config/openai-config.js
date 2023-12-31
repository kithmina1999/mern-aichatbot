"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureOpenAi = void 0;
const openai_1 = __importDefault(require("openai"));
const configureOpenAi = () => {
    const config = new openai_1.default({
        apiKey: process.env.OPENAI_API_KEY,
        organization: process.env.OPENAI_ORGANIZATION_ID,
    });
    return config;
};
exports.configureOpenAi = configureOpenAi;
//# sourceMappingURL=openai-config.js.map