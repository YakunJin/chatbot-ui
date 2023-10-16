import { IRequestChatMessageEvaluate } from "./IRequest/IRequestChatMessageEvaluate";
import { IRequestChatMessageSend } from "./IRequest/IRequestChatMessageSend";
import { IResponse } from "./IResponse";
import { IResponseChatMessageSend } from "./IResponseChatMessageSend";
import { IResponseChatStart } from "./IResponseChatStart";

export interface IChatBotAction {
    chatStart(chatbot_id: number): Promise<IResponseChatStart | undefined>;
    chatMessageSend(params: IRequestChatMessageSend): Promise<IResponseChatMessageSend | undefined>;
    chatMessageEvaluate(params: IRequestChatMessageEvaluate): Promise<IResponse<any | undefined>>;
}