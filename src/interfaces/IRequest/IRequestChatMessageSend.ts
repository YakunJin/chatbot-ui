export interface IRequestChatMessageSend {
  chatbot_id: number, //机器人id
  session_id: number, //对话id
  message: string, //消息
}