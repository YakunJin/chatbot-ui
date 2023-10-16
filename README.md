## Chatbot聊天室UI
### PC
![image](pc.jpeg)

### 移动端
![image](mobile.jpeg)

## 项目描述

Chatbot项目, Node 16+

## 配置

- 机器人聊天室配置的信息支持API获取，或者自定义
    - 若自定义配置信息，可更改Config.ts文件的chatRoomDefaultStartModel，默认model是ChatbotDefaultStartModel；
    - 若从API获取，Config.ts文件中的chatStartApiUrl需提供对应api url
- Config.chatMessageSendApi： 可配置发送消息API的URL
- Config.chatMessageEvaluateApi： 可配置聊天消息用户反馈的API地址

## 相关Model与interface
 - 如需要可更改model目录中的相关模型
 - ChatBotServer 封装了聊天室相关操作，如需要可更改对应实现或修改方法入参与返回的interface

## 启动与mock调试
- npm run start
- 如需要mock API返回，启动Mockoon, 配置并加载```chatbot_management_mock.json```文件
- 页面访问，http://localhost:3000/?chatbot_id=xxx, chatbot_id需提供

## 打包
- npm run build

## 相关技术与文档

- [Mockoon](https://mockoon.com/docs/latest/about/)
- [ReactHook](https://legacy.reactjs.org/docs/hooks-intro.html)
- [Typescript](https://www.tslang.cn/docs/home.html)
- [craco](https://craco.js.org/docs/getting-started/)
- [windicss/tailwindcss](https://windicss.org/guide/configuration.html)
- [AntDesign](https://ant.design/components/overview)
- [tablericon](https://tabler-icons.io/)
- [lodash](https://www.lodashjs.com/)

