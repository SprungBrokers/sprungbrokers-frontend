import React from "react";
import Chatbot from "react-chatbot-kit";

import config from "./chatbot/chatbotConfig";
import MessageParser from "./chatbot/MessageParser";
import ActionProvider from "./chatbot/ActionProvider";

import 'react-chatbot-kit/build/main.css'

function ChatBox() {
    return (
      <div className="ChatBot">
        <Chatbot
          config={config}
          messageParser={MessageParser}
          actionProvider={ActionProvider}
        />
      </div>
    );
}
  
export default ChatBox;