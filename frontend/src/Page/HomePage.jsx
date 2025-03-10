import React, { useEffect } from "react";
import { useChatStore } from "../Store/chatStore";
import Sidebar from "../Components/Sidebar";
import NochatSelected from "../Components/NochatSelected";
import Chat from "../Components/Chat";

function Home() {
  const { users, getUsers, selectedUser } = useChatStore();
  useEffect(() => {
    getUsers();
  }, []);
  // console.log("users", users);
  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 shadow-cl w-full rounded-lg max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex overflow-hidden h-full rounded-lg">
            <Sidebar/>
            {!selectedUser? <NochatSelected/> : <Chat/>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
