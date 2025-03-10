import { create } from "zustand";
import { axiosInstance } from "../lib/axos";
import { toast } from "react-hot-toast";
import { io } from "socket.io-client";


const Base_URL = import.meta.env.MODE === "development" ? "http://localhost:5000" :"/";
export const useAuthStore = create((set, get) => ({
    authUser: null,
    isLoginIn: false,
    isSignIn: false,
    isUpdateProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/me");
            set({ authUser: res.data });           
            get().connectSocket()
        } catch (error) {
            // console.log("checkAuth error", error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    SignUp: async (data) => {
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data });
            toast.success("Sign up successfully");
            get().connectSocket()
        } catch (error) {
            console.log("checkAuth error", error);
            set({ authUser: null });
            toast.error(error.response.data);
        } finally {
            set({ isSignIn: false });
        }
    },

    LogIn: async (data) => {
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data });
            toast.success("Login successfully");

            get().connectSocket()
        } catch (error) {
            console.log("checkAuth error", error);
            set({ authUser: null });
            toast.error(error.response.data);
        } finally {
            set({ isLoginIn: false });
        }
    },

    logout: async () => {
        try {
            const res = await axiosInstance.get("/auth/logout");
            set({ authUser: null });
            toast.success("Logout successfully");
            get().dissconnectSocket()
        } catch (error) {
            console.log("checkAuth error", error);
            set({ authUser: null });
            toast.error(error.response.data);
        }
    },

    updateProfile: async (data) => {
        set({ isUpdateProfile: true });
        try {
            const res = await axiosInstance.put("/auth/updateProfile", data);
            set({ authUser: res.data });
            toast.success("Profile updated successfully");
        } catch (error) {
            console.log("checkAuth error", error);
            set({ authUser: null });
            toast.error(error.response.data);
        } finally {
            set({ isUpdateProfile: false });
        }
    },

    connectSocket: () => {
        const { authUser } = get();
        if (!authUser || get().socket?.connected) return
        const socket = io(Base_URL, {
            query: {
                userId: authUser._id,
            }
        })        
        socket.connect();
        socket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds });
        })
        set({ socket: socket });
    },
    dissconnectSocket: () => {
      if(get().socket) get().socket.disconnect();
    }
}))