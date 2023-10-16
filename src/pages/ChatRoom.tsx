import { Button, Divider, Input, Spin, message } from 'antd';
import { useEffect, useRef, useState } from 'react';
import getQuery from '../utils/getQueryEntity';
import { BusinessCode } from '../interfaces/IResponse';
import { ChatBotStartModel } from '../model/ChatBotStartModel';
import { isMobile } from '../utils/mobile';
import IconBullet from '../res/icon_bullet.png';
import { IconLink } from '@tabler/icons-react';
import { EvaluationType } from '../enums/EvaluationType';
import { ChatBotServer } from '../entity/ChatBotServer';

declare const ModeTypes: readonly ["default", "preview"];
type modeType = typeof ModeTypes[number];

export interface IQueryChatRoom {
    chatbot_id: number,
    mode?: modeType,
}

enum ChatRoomMessageType {
    Ask = 1,
    Recieve = 2
}

export class ChatRoomMessage {
    type = ChatRoomMessageType.Ask;
    message = '';
    attachments: Array<string> = [];
    id?: number;
}

const chatBotServer = new ChatBotServer();

const ChatRoom = () => {
    const [sessionId, setSessionId] = useState<number>();
    const [chatbotStartModel, setChatbotStartModel] = useState<ChatBotStartModel>();
    const [chatMessages, setChatMessages] = useState<Array<ChatRoomMessage>>();
    const [chatBotId, setChatbotId] = useState<number>();
    const timer = useRef<any>();
    const [isTimeout, setIsTimeout] = useState<boolean>(false);
    const [currentInputText, setCurrentInputText] = useState<string>('');
    const scrollContentRef = useRef<any>();
    const [messageApi, contextHolder] = message.useMessage();
    const [messageIdEvaluationMap, setMessageIdEvaluationMap] = useState<Map<number, EvaluationType>>(new Map());
    const [currentMode, setCurrentMode] = useState<modeType>();
    const [isLoading, setIsLoading] = useState(false);

    const chatStart = async (chatbot_id: number) => {
        const res = await chatBotServer.chatStart(chatbot_id);
        if (res) {
            setChatbotStartModel(res.chatbot);
            setSessionId(res.session_id);
            startSessionTimeOutTimer(res.chatbot.timeout_minute);
            if (res.chatbot.greeting) {
                setChatMessages([{
                    type: ChatRoomMessageType.Recieve,
                    message: res.chatbot.greeting,
                    attachments: []
                }])
            }
        }
    }
    const scrollToBottom = () => {
        setTimeout(() => {
            // get the scroll height of the window
            const scrollHeight = scrollContentRef.current.scrollHeight;
            // scroll to the bottom of webpage
            scrollContentRef.current.scrollTo({ top: scrollHeight, behavior: "smooth" });
            // scrollContentRef.current.scrollTo(0, scrollHeight);
        }, 100);
    }
    const handleSend = async (e: any) => {
        let message = '';
        if (e.keyCode === 13) {
            message = (e.target && e.target.value);
        } else {
            message = e;
        }
        // const message = (e.target && e.target.value) || e;
        if (currentMode === 'preview' || !message) {
            return;
        }
        setIsLoading(true);
        const chatMessagesClone = [...chatMessages || []];
        setCurrentInputText('');
        chatMessagesClone.push({
            type: ChatRoomMessageType.Ask,
            message: message,
            attachments: [],
        });
        setChatMessages(chatMessagesClone);
        scrollToBottom();

        const res = await chatBotServer.chatMessageSend({
            chatbot_id: chatBotId || 0,
            session_id: sessionId || 0,
            message: message || ''
        });
        if (res) {
            chatMessagesClone.push({
                type: ChatRoomMessageType.Recieve,
                message: res.message,
                id: res.id,
                attachments: res.attachments
            })
        }
        setIsLoading(false);
        setChatMessages([...chatMessagesClone]);
        scrollToBottom();
        startSessionTimeOutTimer((chatbotStartModel && chatbotStartModel.timeout_minute) || 0);
    }
    const getMessageClassName = (message: ChatRoomMessage) => {
        let className = 'text-sm max-w-[100%] font-normal px-3 py-[13px] rounded-t-xl mt-5 relative whitespace-pre-wrap';
        if (message.type === ChatRoomMessageType.Ask) {
            className += ' text-white bg-custom-335DFF self-end rounded-bl-xl';
        } else {
            className += ' bg-custom-F8F9FD rounded-custom-left self-start rounded-br-xl';
        }
        return className;
    }
    const messageRender = (message: ChatRoomMessage) => {
        if (!message.message) {
            return ''
        }
        const messageArr = message.message.split('{}');
        const attatchments = message.attachments || [];
        return messageArr.length > 0 && messageArr.map((s, index) => {
            const image = attatchments[index];
            if (image) {
                return <div>
                    {s}
                    <img src={image} alt="" />
                </div>
            } else {
                return s;
            }
        }) || ''
    }
    const startSessionTimeOutTimer = (timeoutMinute: number) => {
        let timeoutSec = timeoutMinute * 60 || 0;
        if (timer.current) {
            clearInterval(timer.current);
            timer.current = null;
        }
        if (timeoutSec > 0) {
            timer.current = setInterval(() => {
                if (timeoutSec <= 0) {
                    clearInterval(timer.current);
                    timer.current = null;
                    setIsTimeout(true);
                } else {
                    timeoutSec -= 1;
                }
            }, 1000);
        }
    }
    const handleInputChange = (e: any) => {
        setCurrentInputText(e.target.value);
    }
    const handleClickCopyLink = () => {
        // window.navigator.clipboard.writeText(window.location.href);
        copyValue(window.location.href);
        messageApi.open({
            type: 'success',
            content: '已复制',
        });
    }

    const chatMessageEvaluate = async (messageId: number, evaluation: EvaluationType) => {
        const messageIdEvaluationMapClone = new Map(messageIdEvaluationMap);
        if (messageIdEvaluationMapClone.has(messageId)) {
            return;
        }
        const res = await chatBotServer.chatMessageEvaluate({ message_id: messageId, evaluation });
        if (res.code === BusinessCode.Success) {
            if (messageIdEvaluationMap) {
                messageIdEvaluationMapClone.set(messageId, evaluation);
                setMessageIdEvaluationMap(messageIdEvaluationMapClone);
            }
        }
    }

    // 先给要复制的文本或者按钮加上点击事件后，并将要复制的值传过来
    const copyValue = (val: string) => {
        if (navigator.clipboard && window.isSecureContext) {
            return navigator.clipboard.writeText(val)
        } else {
            // 创建text area
            const textArea = document.createElement('textarea')
            textArea.value = val
            // 使text area不在viewport，同时设置不可见
            document.body.appendChild(textArea)
            textArea.focus()
            textArea.select()
            return new Promise<void>((res, rej) => {
                // 执行复制命令并移除文本框
                document.execCommand('copy') ? res() : rej()
                textArea.remove();
            })
        }
    }
    useEffect(() => {
        const query = getQuery<IQueryChatRoom>();
        if (query.mode) {
            setCurrentMode(query.mode);
        }
        if (query.mode !== 'preview') {
            setChatbotId(query.chatbot_id);
            chatStart(query.chatbot_id);
        }
    }, [])

    const exampleQuestions: Array<string> = (chatbotStartModel && JSON.parse(chatbotStartModel.example_question)) || []

    return (
        <>
            {contextHolder}
            {
                isMobile() &&
                <div id='chat-room-mobile' className={`w-full h-screen flex flex-col px-4 box-border pt-3 ${chatbotStartModel?.client_background_color}`}>
                    <div className={`flex self-start justify-start items-center top-0 left-0 w-full`}>
                        <img className='w-8 h-8 rounded-full' src={chatbotStartModel?.chatbot_icon} alt="" />
                        <h5 className='ml-[15px] text-base font-medium not-italic'>{chatbotStartModel?.name}</h5>
                    </div>
                    <div className='flex flex-col justify-start pb-8 warp flex-1 overflow-y-scroll custom-scrollbar' ref={scrollContentRef}>
                        <div className='flex justify-start items-center w-full self-start mt-5 order-1 mb-8'><img className='w-3 h-3 mr-2' src={IconBullet} alt="" /><span className='not-italic text-xl font-medium'>你可以这样问我</span></div>
                        {
                            exampleQuestions.length > 0 && <div id='question-list' className='w-full flex flex-wrap justify-start items-start order-1'>
                                {exampleQuestions.map((question, index) => {
                                    return <div key={index} className='w-[166px] h-[70px] py-4 px-3 mr-3 mt-3 text-sm font-normal bg-custom-F8F9FD rounded-xl' onClick={() => handleSend(question)}>{question}</div>
                                })}
                            </div>
                        }
                        {chatMessages?.map((message, index) => {
                            return <div key={index} className={`flex flex-col justify-start items-start`} style={{ order: index }}>
                                {message.message && <div className={getMessageClassName(message)}>{messageRender(message)}</div>}
                                {!!message.id && message.type === ChatRoomMessageType.Recieve && message.message && <div id='evaluate-section' className='flex justify-between items-center bg-custom-F8F9FD rounded-lg px-3 py-2 mt-[10px]'>
                                    <div className='flex items-center mr-2' onClick={() => chatMessageEvaluate(message.id || 0, EvaluationType.Positive)}>
                                        {!!message.id && messageIdEvaluationMap?.get(message.id) === EvaluationType.Positive && <><em className="inline-block bg-custom-icon-positive-blue h-[15px] w-[15px] bg-no-repeat bg-cover mr-[6px]" /><span className='text-xs text-custom-335DFF mt-1'>赞</span></>}
                                        {!!message.id && !messageIdEvaluationMap?.get(message.id) && <><em className="inline-block bg-custom-icon-positive h-[15px] w-[15px] bg-no-repeat bg-cover mr-[6px]" /><span className='text-xs text-custom-636363 mt-1'>赞</span></>}
                                    </div>
                                    <div className='flex items-center mt-1' onClick={() => chatMessageEvaluate(message.id || 0, EvaluationType.Negative)}>
                                        {!!message.id && messageIdEvaluationMap?.get(message.id) === EvaluationType.Negative && <><em className="inline-block bg-custom-icon-negative-red h-[15px] w-[15px] bg-no-repeat bg-cover mr-[6px]" /><span className='text-xs text-custom-ff5555'>踩</span></>}
                                        {!!message.id && !messageIdEvaluationMap?.get(message.id) && <><em className="inline-block bg-custom-icon-negative h-[15px] w-[15px] bg-no-repeat bg-cover mr-[6px]" /><span className='text-xs text-custom-636363'>踩</span></>}
                                    </div>
                                </div>}
                            </div>
                        })}
                        {isLoading && <div className='mt-5 self-center order-last'><Spin /></div>}
                        {isTimeout && <i className='font-normal text-sm not-italic text-custom-939393 text-center mt-5 order-last'>
                            本次对话已结束
                        </i>}
                    </div>
                    <div className={`safe-padding-bottom w-full pt-[6px] flex justify-center items-center`}>
                        <div className='w-[349px] h-[42px] rounded-full bg-custom-F8F9FD overflow-hidden'>
                            <Input className='w-full h-full' placeholder="" value={currentInputText} bordered={false} onChange={handleInputChange} onPressEnter={handleSend} />
                        </div>
                    </div>
                </div>
            }
            {
                !isMobile() &&
                <div id='chat-room-pc' className={`flex flex-col w-screen h-screen items-center justify-between py-[77px] ${chatbotStartModel?.pc_background}`}>
                    <div className={`relative w-4/5 h-full flex flex-col px-6 box-border rounded-[20px] py-6 bg-white`}>
                        <div className={`flex self-start justify-start items-center top-0 left-0 w-full`}>
                            <img className='w-8 h-8 rounded-full' src={chatbotStartModel?.chatbot_icon} alt="" />
                            <h5 className='ml-[15px] text-base font-medium not-italic'>{chatbotStartModel?.name}</h5>
                        </div>
                        <Divider />
                        <div className='flex flex-col justify-start warp flex-1 overflow-y-scroll pb-[84px] custom-scrollbar' ref={scrollContentRef}>
                            <div className='flex justify-start items-center w-full self-start mb-5 order-1 mt-5'><img className='w-3 h-3 mr-2' src={IconBullet} alt="" /><span className='not-italic text-xl font-medium'>你可以这样问我</span></div>
                            {
                                exampleQuestions.length > 0 && <div id='question-list' className='w-full flex flex-wrap justify-start items-start order-1'>
                                    {exampleQuestions.map((question, index) => {
                                        return <div className='relative' onClick={() => handleSend(question)}>
                                            <div key={index} className='w-[288px] h-[104px] py-4 px-3 mx-2 mt-3 text-sm font-normal bg-custom-F8F9FD rounded-xl hover:bg-custom-EDEFF9'>{question}</div>
                                            <div className='absolute bottom-[17px] right-5'>
                                                <div className='rounded-xl bg-custom-335DFF opacity-10 w-12 h-6'></div>
                                                <span className='absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center leading-6 font-normal text-xs text-custom-335DFF cursor-pointer'>发送</span>
                                            </div>
                                        </div>
                                    })}
                                </div>
                            }
                            {chatMessages?.map((message, index) => {
                                return <div key={index} className={`flex flex-col justify-start items-start`} style={{ order: index }}>
                                    {message.message && <div className={getMessageClassName(message)}>{messageRender(message)}</div>}
                                    {!!message.id && message.type === ChatRoomMessageType.Recieve && message.message && <div id='evaluate-section' className='flex justify-between items-center bg-custom-F8F9FD rounded-lg px-3 py-2 mt-[10px]'>
                                        <div className='flex items-center mr-2' onClick={() => chatMessageEvaluate(message.id || 0, EvaluationType.Positive)}>
                                            {!!message.id && messageIdEvaluationMap?.get(message.id) === EvaluationType.Positive && <><em className="inline-block bg-custom-icon-positive-blue h-[15px] w-[15px] bg-no-repeat bg-cover mr-[6px]" /><span className='text-xs text-custom-335DFF mt-1'>赞</span></>}
                                            {!!message.id && !messageIdEvaluationMap?.get(message.id) && <><em className="inline-block bg-custom-icon-positive h-[15px] w-[15px] bg-no-repeat bg-cover mr-[6px]" /><span className='text-xs text-custom-636363 mt-1'>赞</span></>}
                                        </div>
                                        <div className='flex items-center mt-1' onClick={() => chatMessageEvaluate(message.id || 0, EvaluationType.Negative)}>
                                            {!!message.id && messageIdEvaluationMap?.get(message.id) === EvaluationType.Negative && <><em className="inline-block bg-custom-icon-negative-red h-[15px] w-[15px] bg-no-repeat bg-cover mr-[6px]" /><span className='text-xs text-custom-ff5555'>踩</span></>}
                                            {!!message.id && !messageIdEvaluationMap?.get(message.id) && <><em className="inline-block bg-custom-icon-negative h-[15px] w-[15px] bg-no-repeat bg-cover mr-[6px]" /><span className='text-xs text-custom-636363'>踩</span></>}
                                        </div>
                                    </div>}
                                </div>
                            })}
                            {isLoading && <div className='mt-5 self-center order-last'><Spin /></div>}
                            {isTimeout && <i className='font-normal text-sm not-italic text-custom-939393 text-center mt-5 order-last'>
                                本次对话已结束
                            </i>}
                        </div>
                        <Divider />
                        <div className={`w-full px-6 flex justify-center items-center`}>
                            <div className='w-[812px] h-10 rounded-lg bg-custom-F8F9FD overflow-hidden mr-6'>
                                <Input className='w-full h-full custom-input-padding-px-2' value={currentInputText} bordered={false} onChange={handleInputChange} onPressEnter={handleSend} />
                            </div>
                            <Button type='primary' onClick={() => handleSend(currentInputText)}>发送</Button>
                        </div>
                    </div>
                    <div className='flex h-10 justify-center items-center fixed right-0 bottom-32 rounded-tl-lg rounded-bl-lg bg-white px-3'>
                        <IconLink className='mr-2' size={20} stroke={1} /><span className='text-sm font-light hover:cursor-pointer' onClick={handleClickCopyLink}>复制链接</span>
                    </div>
                </div>
            }
        </>
    )
}

export default ChatRoom;