import { ChatBotStartModel } from "../model/ChatBotStartModel";

export interface IResponseChatStart {
  session_id: number;
  chatbot: ChatBotStartModel;
}