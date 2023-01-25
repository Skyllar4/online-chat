import React from "react";
import { ChatHeader } from "./ChatHeader/ChatHeader";
import { MainLayout } from "./MainLayout/MainLayout";
import { ChatList } from "./ChatList/ChatList";
import { ChatFooter } from "./ChatFooter/ChatFooter";
import { io } from "socket.io-client";
import { GeneralChat } from "./GeneralChat/GeneralChat";

const socket = io('http://localhost:3000');

const socketMessage = (msg: string) => {
     socket.emit('chat message', msg);
}

export function MainChatComponent() {
    
        return <>
            <ChatHeader />
            <MainLayout>
                <ChatList />
                <div className="obert">
                    <GeneralChat />
                    <ChatFooter socketFn={socketMessage}/>
                </div>
            </MainLayout>
          </>
    
}
