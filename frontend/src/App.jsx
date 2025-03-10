import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Page/HomePage";
import ProfilePage from "./Page/ProfilePage";
import SettingPage from "./Page/SettingPage";
import SignUp from "./Page/SignUp";
import LoginPage from "./Page/LoginPage";
import { useAuthStore } from "./Store/authStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./Store/themeStore";

export default function App() {
  const { checkAuth, authUser, isCheckingAuth,onlineUsers } = useAuthStore();
  const { theme } = useThemeStore();
  useEffect(() => {
    checkAuth();
  }, []);
  if (!authUser && isCheckingAuth) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }
  console.log("onlineUsers", onlineUsers);
  return (
    <div className="App " data-theme={theme}>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUp /> : <Navigate to="/" />}
        />
        <Route path="/setting" element={<SettingPage />} />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
      </Routes>
      <Toaster />
    </div>
  );
}
