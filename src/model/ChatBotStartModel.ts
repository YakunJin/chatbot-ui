import { ChatBotBasicModel } from "./ChatBotModel";

export class ChatBotStartModel extends ChatBotBasicModel {
  description = '';
  greeting = '';
  example_question = '';
  chatbot_icon = '';
  client_background_color = '';
  pc_background_type = 1;
  pc_background = '';
  timeout_minute = 3;
}
