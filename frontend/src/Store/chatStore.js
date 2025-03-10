import { create } from "zustand";
import { axiosInstance } from "../lib/axos";
import toast from "react-hot-toast";
import { useAuthStore } from "./authStore";

export const useChatStore = create((set, get) => ({
    message: [],
    users: [],
    selectedUser: null,
    ismessageLoading: false,
    isUserLoading: false,


    getUsers: async () => {
        set({ isUserLoading: true })
        try {
            const res = await axiosInstance.get("/chat/users");
            set({ users: res.data });
        } catch (error) {
            console.log("users error", error);
            toast.error(error.response.data);
        } finally {
            set({ isUserLoading: false })
        }
    },

    getMessages: async (id) => {
        set({ ismessageLoading: true })
        try {
            const res = await axiosInstance.get(`/chat/${id}`);
            // console.log(res)
            set({ message: res.data });
        } catch (error) {
            console.log("users error", error);
            toast.error(error.response.data);
        } finally {
            set({ ismessageLoading: false })
        }
    },

    sendMessage: async (messageData) => {
        // console.log(messageData)
        const { selectedUser, message } = get();
        // console.log(selectedUser._id)
        try {
            const res = await axiosInstance.post(`/chat/send/${selectedUser._id}`, messageData);
            set({ message: [...message, res.data] });
        } catch (error) {
            console.log("users error", error);
            toast.error(error.response.data);

        }
    },

    subascribeToMessages: async () => {
        const { selectedUser } = get();
        if (!selectedUser) {
            return
        }
        const soket = useAuthStore.getState().socket;
        soket.on("newMessage", (newMessage) => {
            if (newMessage.senderID !== selectedUser._id) return
            set({ message: [...get().message, newMessage] });
        })
    },
    unsubascribeToMessages: async () => {
        const soket = useAuthStore.getState().socket;
        soket.off("newMessage");
    },
    setSelectedUser: (user) => set({ selectedUser: user }),
}))