import React from "react";

export interface IChatMessageProps {
  message: string;
}

const ChatMessage = (props: IChatMessageProps) => {
  return <span>{props.message}</span>;
};

export default ChatMessage;
