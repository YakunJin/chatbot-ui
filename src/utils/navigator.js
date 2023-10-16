export const goChatRoom = (chatRoomId) => {
    window.open(`${window.location.origin}/chat/${chatRoomId}/#/chat-room?chatbot_id=${chatRoomId}`);
}