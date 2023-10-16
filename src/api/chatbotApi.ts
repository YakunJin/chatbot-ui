import { IResponse } from '../interfaces/IResponse';
import { getServer } from './base';
import { IResponseChatStart } from '../interfaces/IResponseChatStart';
import { IRequestChatMessageSend } from '../interfaces/IRequest/IRequestChatMessageSend';
import { IResponseChatMessageSend } from '../interfaces/IResponseChatMessageSend';
import { IRequestChatMessageEvaluate } from '../interfaces/IRequest/IRequestChatMessageEvaluate';
import { Config } from '../Config';

export class ChatbotApi {
  static host = process.env.NODE_ENV === 'production' ? '/' : '/';

  static instance = getServer(this.host);

  static chatStartApi = async (chatbot_id: number): Promise<IResponse<IResponseChatStart>> => {
    if(!Config.chatStartApiUrl) {
      throw new Error("chatStartApiUrl url未提供, 请配置Config文件");
    }
    const res = await this.instance.post(Config.chatStartApiUrl, { chatbot_id });
    return res;
  }

  static chatMessageSendApi = async (params: IRequestChatMessageSend): Promise<IResponse<IResponseChatMessageSend>> => {
    if(!Config.chatMessageSendApi) {
      throw new Error("chatMessageSendApi url未提供, 请配置Config文件");
    }
    const res = await this.instance.post('/aj/chatbot/chat/message/send', { ...params });
    return res;
  }
  static chatMessageEvaluateApi = async (params: IRequestChatMessageEvaluate): Promise<IResponse<any>> => {
    if(!Config.chatMessageEvaluateApi) {
      throw new Error("chatMessageEvaluateApi url未提供, 请配置Config文件");
    }
    const res = await this.instance.post('/aj/chatbot/chat/message/evaluate', { ...params });
    return res;
  }
}