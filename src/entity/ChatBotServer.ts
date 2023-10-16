import { Config } from "../Config";
import { ChatbotApi } from "../api/chatbotApi";
import { IChatBotAction } from "../interfaces/IChatBotAction";
import { IRequestChatMessageEvaluate } from "../interfaces/IRequest/IRequestChatMessageEvaluate";
import { IRequestChatMessageSend } from "../interfaces/IRequest/IRequestChatMessageSend";
import { BusinessCode } from "../interfaces/IResponse";
import { IResponseChatMessageSend } from "../interfaces/IResponseChatMessageSend";
import { IResponseChatStart } from "../interfaces/IResponseChatStart";

export class ChatBotServer implements IChatBotAction {
    async chatStart(chatbot_id: number): Promise<IResponseChatStart | undefined> {
        if(Config.chatRoomConfigSource === 'api') {
            const res = await ChatbotApi.chatStartApi(chatbot_id);
            if(res.code === BusinessCode.Success) {
                return res.data;
            }
        } else {
            return new Promise((resolve) => {
                resolve({
                    session_id: new Date().getTime(),
                    chatbot: Config.chatRoomDefaultStartModel
                });
            })
        }
    }
    async chatMessageSend(params: IRequestChatMessageSend): Promise<IResponseChatMessageSend | undefined> {
        const res = await ChatbotApi.chatMessageSendApi(params);
        if(res.code === BusinessCode.Success) {
            return res.data;
        }
    }
    async chatMessageEvaluate(params: IRequestChatMessageEvaluate): Promise<any | undefined > {
        const res = await ChatbotApi.chatMessageEvaluateApi(params);
        if(res.code === BusinessCode.Success) {
            return res.data;
        }
    }
}   