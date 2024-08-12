import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../store/useConversation";


const Conversation = ({conversation, emoji}: {conversation: ConversationType, emoji: string}) => {
    
    const { setSelectedConversation, selectedConversation } = useConversation();
    const isSelected = selectedConversation?.id === conversation.id;
    
    const {onlineUsers} = useSocketContext();
    console.log("onlineUsers", onlineUsers);
    const isOnline = onlineUsers.includes(conversation.id);
    console.log("isOnline", isOnline);
  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${
          isSelected ? "bg-sky-500" : ""
        }`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className={`avatar ${isOnline ? "online" : "offline"}`}>
          <div className="w-12 rounded-full">
            <img src={conversation.profilePic} alt="user avatar" />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{conversation.username}</p>
            <span className="text-xl">{emoji}</span>
          </div>
        </div>
      </div>
      <div className="divider my-0 py-0 h-1"></div>
    </>
  );
};

export default Conversation;
