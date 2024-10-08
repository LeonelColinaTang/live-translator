import Conversation from "./Conversation";
// import { DUMMY_CONVERSATIONS } from "../../dummy_data/dummy";
import useGetUsersForSideBar from "../../hooks/useGetUsersForSideBar";
import { getRandomEmoji } from "../../utils/emojis";


const Conversations = () => {
  // Here we are getting the conversations from out hooks, right now we do not have them
  const { conversations, loading } = useGetUsersForSideBar();
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation: any) => (
        <Conversation key={conversation.id} conversation={conversation} emoji={getRandomEmoji()}/>
      ))}
      {loading ? <span className="loading loading-spinner mx-auto" /> : null}
    </div>
  );
};

export default Conversations;
