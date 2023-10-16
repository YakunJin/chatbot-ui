export class SessionModel {
  id = 0;
  name = '';
  content = '';
  // evaluation = EvaluationType.All;
  agree_count = 0;
  disagree_count = 0;
  create_time = '';
}
export class SessionListModel {
  count = 0;
  page_id = 0;
  list: Array<SessionModel> = [];
}