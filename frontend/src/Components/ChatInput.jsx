import React, { useRef, useState } from "react";
import { useChatStore } from "../Store/chatStore";
import { X } from "lucide-react";
import { Image, Send } from "lucide-react";
import toast from "react-hot-toast";

export default function ChatInput() {
  const [message, setMessage] = useState("");
  const [Imagesend, setImageSend] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const base64Image = reader.result;
      setImageSend(base64Image);
      // const res = await ({ profilePic: base64Image });
    };
  };
  const handleImageRemove = () => {
    setImageSend(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() && !Imagesend) return;

    try {
      await sendMessage({ text: message, image: Imagesend });
      setMessage("");
      setImageSend(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  return (
    <div className="p-4 w-full">
      {Imagesend && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={Imagesend}
              alt="Selected"
              className="w-20 h-20 rounded-lg object-cover border border-zinc-700"
            />
            <button
              onClick={handleImageRemove}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}
      <form
        onSubmit={handleSendMessage}
        className="flex items-center gap-2 p-2 bg-base-100 border-t border-base-200"
      >
        {/* Input Container */}
        <div className="flex-1 flex gap-2 items-center">
          {/* Message Input */}
          <input
            type="text"
            className="w-full input input-bordered input-sm sm:input-md rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          {/* File Input (Hidden) */}
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />

          {/* Image Upload Button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className={`btn btn-circle btn-sm sm:btn-md ${
              Imagesend
                ? "btn-primary"
                : "btn-ghost text-zinc-400 hover:text-primary"
            } transition-all`}
          >
            <Image size={20} />
          </button>
        </div>

        {/* Send Button */}
        <button
          className="btn btn-sm btn-circle "
          type="submit"
          disabled={!message.trim() && !Imagesend}
        >
          <Send size={22} />
        </button>
      </form>
    </div>
  );
}
