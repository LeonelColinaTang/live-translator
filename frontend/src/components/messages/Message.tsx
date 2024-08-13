import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../store/useConversation";
import { extractTime } from "../../utils/extractTime";
// import { translate } from "../../hooks/useGemini";
// import { useEffect, useState } from "react";


const Message = ({ message }: { message: MessageType }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();

  const fromMe = message.senderId === authUser?.id;
  const img = fromMe ? authUser?.profilePic : selectedConversation?.profilePic;
  const chatClass = fromMe ? "chat-end" : "chat-start";
  const bubbleBg = fromMe ? "bg-blue-500" : "";

  //const translatedArray: string[] = [];
  


  return (
    <div className={`chat ${chatClass}`}>
      {/* Avatar image */}
      <div className="hidden md:block chat-image-avatar">
        <div className="w-6 md:w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={img ||`https://avatar.iran.liara.run/public/${selectedConversation?.id}`}/>
        </div>
      </div>
      {/* Message */}
      <p className={`chat-bubble text-white ${bubbleBg} text-sm md:text-md`}>{message.body}</p>
      {/* time footer */}
      <span className="chat-footer opacity-50 text-xs flex gap-1 items-center text-gray-300">
        {extractTime(message.createdAt)}
      </span>
    </div>
  );
};

export default Message;
