// Imports
import * as actionTypes from "./actionTypes";

// Chat Action Creators

// Set ChatThread to an array
const SetChatThread = (messages) => ({
    type: actionTypes.SET_CHAT_THREAD,
    payload: messages,
});

// Update Chat Thread for Chat Room
const UpdateChatThread = (message) => ({
    type: actionTypes.UPDATE_CHAT_THREAD,
    payload: message,
});

// Set Message
const SetMessage = (message) => ({
    type: actionTypes.SET_MESSAGE,
    payload: message,
});

// Set Users Count
const SetUsersCount = (usersCount) => ({
    type: actionTypes.SET_USERS_COUNT,
    payload: usersCount,
});

// Set Send Loading
const SetSendLoading = (loading) => ({
    type: actionTypes.SET_SEND_LOADING,
    payload: loading,
});

// Set Typing
const SetTyping = (typing) => ({
    type: actionTypes.SET_TYPING,
    payload: typing,
});

// Mark Message as Read
const MarkMessageAsRead = (owner_id) => ({
    type: actionTypes.MARK_AS_READ,
    payload: owner_id,
});

// Update a Message Item
const UpdateMessageItem = (message_id, message) => ({
    type: actionTypes.UPDATE_A_MESSAGE_ITEM,
    payload: {
        message_id,
        message,
    },
});

// Remove a Message Item
const RemoveMessageItem = (message_id) => ({
    type: actionTypes.REMOVE_MESSAGE_ITEM,
    payload: message_id,
});

const ChatRoomActionCreators = {
    SetChatThread,
    UpdateChatThread,
    SetMessage,
    SetUsersCount,
    SetSendLoading,
    SetTyping,
    MarkMessageAsRead,
    UpdateMessageItem,
    RemoveMessageItem,
}

export default ChatRoomActionCreators;