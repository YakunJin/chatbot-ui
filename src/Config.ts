import { ChatBotStartModel } from "./model/ChatBotStartModel";

type ChatRoomConfigSource = 'default' | 'api';

class ChatbotDefaultStartModel extends ChatBotStartModel {
    constructor(
        id: number,
        name: string,
        description: string,
        greeting: string,
        example_question: string,
        chatbot_icon: string,
        client_background_color: string,
        pc_background: string,
        timeout_minute: number,
    ) {
        super();
        this.id = id
        this.name = name
        this.description = description //描述
        this.greeting = greeting //欢迎语
        this.example_question = example_question //示例问题
        this.chatbot_icon = chatbot_icon //机器人图标
        this.client_background_color = client_background_color //移动端背景色样式class
        this.pc_background = pc_background //PC端背景色样式class
        this.timeout_minute = timeout_minute //超时时间
    }
}

export class Config {
    static chatRoomConfigSource: ChatRoomConfigSource = 'default'; // 聊天室配置信息可以从api获取或自定义配置
    static chatRoomDefaultStartModel: ChatbotDefaultStartModel = new ChatbotDefaultStartModel(
        0,
        "HR助手",
        "HR助手",
        "欢迎使用HR助手啊",
        "[\"如何办理在职证明？\",\"年假的扣减顺序是什么？\",\"工作居住证办理流程？\",\"体检怎么预约？\",\"什么是福利性休假？\",\"考勤异常的界定标准是什么？\"]",
        "data:image/png;base64,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",
        "custom-bg-6",
        "custom-bg-6",
        15,
    );
    static chatStartApiUrl: ''; //获取聊天室配置api，chatRoomConfigSource是api时必填
    static chatMessageSendApi: ''; //消息发送api
    static chatMessageEvaluateApi: ''; //聊天消息用户反馈api
}