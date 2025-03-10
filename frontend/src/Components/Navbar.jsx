import React from "react";
import { useAuthStore } from "../Store/authStore";
import { Link } from "react-router-dom";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

function Navbar() {
  const { authUser, logout } = useAuthStore();
  return (
    <header className="bg-base-100 border-b border-base-300 fixed w-full z-50 top-0 backdrop-blur-lg bg-base-100/80">
      <div className="container mx-auto h-16 px-4">
        <div className=" flex items-center justify-between h-full">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-lg font-bold">Chatty</h1>
            </Link>
          </div>
          <div className="flex items-center rounded-lg gap-2">
            <Link
              to={"/setting"}
              className={"btn btn-sm gap-2  rounded-lg transition-colors"}
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>
            {authUser && (
              <>
                <Link to="/profile" className="btn btn-sm gap-2">
                  <User className="size-5 " />
                  <span className="hidden sm:inline">{authUser.username}</span>
                </Link>

                <button
                  className="flex gap-2 items-center"
                  onClick={logout}
                  type="button"
                >
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
