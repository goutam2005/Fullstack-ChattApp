import React, { useEffect, useRef } from "react";
import { useChatStore } from "../Store/chatStore";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import { useAuthStore } from "../Store/authStore";
import { formatDate } from "../lib/utils";

const Chat = () => {
  const {
    message,
    ismessageLoading,
    getMessages,
    selectedUser,
    unsubascribeToMessages,
    subascribeToMessages,
  } = useChatStore();

  const { authUser } = useAuthStore();
  const messageEndRuf = useRef(null);

useEffect(() => {
  if (messageEndRuf.current && message) {
    messageEndRuf.current.scrollIntoView({ behavior: "smooth" });
  }

},[message])

  useEffect(() => {
    getMessages(selectedUser._id);
    subascribeToMessages();
    return () => {
      unsubascribeToMessages();
    }
  }, [selectedUser._id, getMessages, subascribeToMessages, unsubascribeToMessages]);
  
  if (ismessageLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-y-auto">
        <ChatHeader />
        <MessageSkeleton />
        <ChatInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-y-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {message.map((message) => (
          <div
            key={message._id}
            className={`chat ${
              message.senderID === authUser._id ? "chat-end" : "chat-start"
            }`}
            ref={messageEndRuf}
          >
            <div className=" chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderID === authUser._id
                      ? authUser.profilePic ||
                        "https://img.icons8.com/?size=100&id=LPk9CY756Am8&format=png&color=000000"
                      : selectedUser.profilePic ||
                        "https://img.icons8.com/?size=100&id=LPk9CY756Am8&format=png&color=000000"
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatDate(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>
      <ChatInput />
    </div>
  );
};

export default Chat;
