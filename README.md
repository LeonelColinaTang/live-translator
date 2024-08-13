# live-translator

Live-Translator is  a full-stack app chatting app which translates messages on real time. When a user registers, they can select their preferred language and all the texts they receive will be shown in that selected language. 

*** 

## Technologies Utilized

* Frontend

    * `React` for rendering components.
    * `Zustand` for state management.
    * `Tailwind`and `DaisyUI` for styling pages and components.
    * `Typescript` for dynamic updates and other basic frontend interactions.
    * `Socket.io-client` for real-time events.
    * `Google Generative ai` by `Gemini` for text translation.
    * `React Toaster` for error handling.

* Backend  
    * `Node` and `Express` as the backend framework.
    * `PostgreSQL` for database storage.
    * `Prisma` as the ORM to interact with the database.
    * `Socket.io` for the real-time bi-directional communication.  
    * `JSONwebToken` for user authentication.  

***

## Major Features and Code Snippets


### Store using Zustand

Since we decided to use React for the frontend, Zustand was a perfect option due to its simplicity being used as a hook. With it, one can easily access and update the store. For this project, the store contains a `selectedConversation` and the `messages` as well as the setter function: 

```typescript

import { create } from "zustand";

interface ConversationState {
  selectedConversation: ConversationType | null;
  messages: MessageType[];
  setSelectedConversation: (conversation: ConversationType | null) => void;
  setMessages: (messages: MessageType[]) => void;
}

const useConversation = create<ConversationState>((set) => ({
  selectedConversation: null,
  setSelectedConversation: (conversation) =>
    set({ selectedConversation: conversation }),
  messages: [],
  setMessages: (messages) => set({ messages }),
}));


export default useConversation;
```

### Custom made hooks

We also applied custom made hooks to keep the code more readable and avoid coupling. In this example, this hook is used to make the API call to send a message:


```typescript
import useConversation from "../store/useConversation";
import { useState } from "react";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message: string) => {
    if (!selectedConversation) return;

    try {
      setLoading(true);
      // selectedConversation.id is the id of the user I want to text
      const res = await fetch(`/api/messages/send/${selectedConversation.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }
      setMessages([...messages, data]);
    } catch (error: any) {
        console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessage };
};

export default useSendMessage;
```

### Socket.io in Context

We created a Context Provider on React to give the app access to Socket.io:

```typescript
import { createContext, useState, useEffect, useContext, ReactNode, useRef } from 'react';
import {useAuthContext} from './AuthContext';
import io, {Socket} from "socket.io-client"


interface ISocketContext {
    socket: Socket | null;
    onlineUsers: string[];
}

const SocketContext = createContext<ISocketContext | undefined>(undefined);

export const useSocketContext = (): ISocketContext =>{
    const context = useContext(SocketContext);

    if(context === undefined){
        throw new Error("useSocketContext must be used within a SocketContextProvider");
    }
    return context;
}

const socketURL = import.meta.env.MODE === "development" ? "http://localhost:5000" : "/"

const SocketContextProvider = ({children}:{children: ReactNode}) =>{
    const socketRef = useRef<Socket | null>(null);

    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
    const {authUser, isLoading} = useAuthContext();

    useEffect(() =>{
        if(authUser && !isLoading){
            const socket = io(socketURL, {
                query:{
                    userId: authUser.id,
                },
            });
            socketRef.current = socket;

            socket.on("getOnlineUsers", (users: string[]) =>{
                setOnlineUsers(users)
            });

            return () =>{
                socket.close();
                socketRef.current = null;
            }
        } else if(!authUser && !isLoading){
            if(socketRef.current){
                socketRef.current.close();
                socketRef.current = null;
            }
        }


    },[authUser, isLoading]);

    return (
        <SocketContext.Provider value={{socket:socketRef.current, onlineUsers}}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketContextProvider;
```

## Bonus Features

 - Edit Messages
 - Delete Messages