import { EvaluationType } from "../enums/EvaluationType";
import { MessageFromType } from "../enums/MessageFromType";

export class MessageModel {
  id = 0;
  name = '';
  content = '';
  from= MessageFromType.Bot;
  evaluation = EvaluationType.All;
  create_time = '';
}
export class MessageListModel {
  count = 0;
  list: Array<MessageModel> = [];
}