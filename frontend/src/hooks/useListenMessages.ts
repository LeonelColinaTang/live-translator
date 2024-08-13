import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../store/useConversation";

const useListenMessages = () =>{
    const {socket} = useSocketContext();
    const {messages, setMessages} = useConversation();


    useEffect(() => {
        socket?.on("newMessage", (newMessage) =>{
            setMessages([...messages, newMessage])
        })
    }, [socket, messages, setMessages])

}



export default useListenMessages;