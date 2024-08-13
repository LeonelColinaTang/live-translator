// import { DUMMY_MESSAGES } from "../../dummy_data/dummy";
import useGetMessages from "../../hooks/useGetMessages";
import useListenMessages from "../../hooks/useListenMessages";
import Message from "../messages/Message";
import MessageSkeleton from "../skeleton/MessageSkeleton";

const Messages = () => {
  const { loading, messages } = useGetMessages();
  useListenMessages();
  return (
    <div className="px-4 flex-1 overflow-auto">
      {/* If it is loading, we show a skeleton */}
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

      {/* If it's not loading we show the messages */}
      {!loading && messages.map((message:MessageType) => (
          <Message key={message.id} message={message} />
        ))}

      {/* If it's not loading and there are no messages, we show this text */}
      {!loading && messages.length === 0 && (
        <p className="text-center text-white">Send a message to start the conversation</p>
      )}
    </div>
  );
};

export default Messages;
