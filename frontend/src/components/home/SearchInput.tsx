import { IoSearchSharp } from "react-icons/io5";
import { useState } from "react";
import useGetUsersForSideBar from "../../hooks/useGetUsersForSideBar";
import toast from "react-hot-toast";
import useConversation from "../../store/useConversation";

const SearchInput = () => {

  const [search, setSearch] = useState("");
  const {conversations} = useGetUsersForSideBar();
  const {setSelectedConversation} = useConversation()


  const handleSearch = (e: React.FormEvent) =>{
    e.preventDefault();
    if(!search) return;

    if(search.length < 3){
      return toast.error("Search term must be at least 3 characters long");
    }

    const conversation = conversations.find((c: ConversationType) =>
      c.username.toLowerCase()===search.toLowerCase()
    )

    if(!conversation){
      toast.error("Conversation with username provided not found.")
    }else{
      setSelectedConversation(conversation)
    }
    setSearch("")
  }

  return (
    <form className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search by Username"
        className="input input-bordered rounded-full"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <button type="submit" className="btn btn-circle bg-orange-400 text-white hover:bg-azul" onClick={handleSearch}>
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};

export default SearchInput;
