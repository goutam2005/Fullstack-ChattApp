import React from "react";
import { useThemeStore } from "../Store/themeStore";
import { Themes } from "../constants";
import { Send } from "lucide-react";
const Prewiew = [
  {
    id: 1,
    message: "hello , how are you",
    isSent: false,
  },
  {
    id: 2,
    message: "hello ,I am great.And what about you?",
    isSent: true,
  },
];
function SettingPage() {
  const { theme, setTheme } = useThemeStore();
  return (
    <div className=" mx-auto container px-4 pt-20 max-w-5xl">
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold text-base-content">Theme</h2>
          <p className="text-sm text-base-content/70">
            Choose a theme for your chat interface
          </p>
        </div>

        {/* Theme Selection Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Themes.map((t, index) => (
            <button
              key={index}
              className={`group flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-300 ${
                theme === t
                  ? "bg-base-200 border-2 border-primary shadow-lg"
                  : "hover:bg-base-200/50 border border-base-200 hover:border-primary/50 hover:shadow-md"
              }`}
              onClick={() => setTheme(t)}
            >
              {/* Theme Preview */}
              <div
                className="relative h-10 w-full rounded-lg overflow-hidden"
                data-theme={t}
              >
                <div className="absolute inset-0 grid grid-cols-4 gap-1 p-1.5">
                  <div className="rounded-sm bg-primary"></div>
                  <div className="rounded-sm bg-secondary"></div>
                  <div className="rounded-sm bg-accent"></div>
                  <div className="rounded-sm bg-neutral"></div>
                </div>
              </div>

              {/* Theme Name */}
              <span className="text-xs font-medium text-base-content/90 truncate w-full text-center">
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </span>
            </button>
          ))}
        </div>
        <h1 className="text-lg font-semibold mb-3">Preview</h1>
        <div className="rounded-xl border border-base-300 overflow-hidden bg-base-100 shadow-lg">
          <div className="p-4 bg-base-200">
            <div className="max-w-lg mx-auto">
              <div className="bg-base-100 rounded-lg p-4 shadow-sm overflow-hidden">
                {/* chat header */}
                <div className="px-4 py-3 border-b border-base-300 bg-base-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium">
                      J
                    </div>
                    <div>
                      <h1 className="font-medium text-sm">John Doe</h1>
                      <p className="text-xs text-base-content/70">Online</p>
                    </div>
                  </div>
                </div>
                {/* chat body */}
                <div className="p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-base-100">
                  {Prewiew.map((item) => (
                    <div
                      key={item.id}
                      className={`flex ${
                        item.isSent ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-xl p-3 shadow-sm ${
                          item.isSent
                            ? "bg-primary text-primary-content"
                            : "bg-base-200"
                        }`}
                      >
                        <p className="text-sm">{item.message}</p>
                        <p
                          className={`text-[10px] mt-1.5 ${
                            item.isSent
                              ? "text-primary-content/70"
                              : "text-base-content/70"
                          }`}
                        >
                          12:00 PM
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                {/* chat input */}
                <div className="p-4 border-t border-base-300 bg-base-100">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="input input-bordered flex text-sm w-[90%] h-10"
                      placeholder="Type message here..."
                      value="This is a test message"
                      readOnly
                    />
                    <button className="btn btn-primary h-10 min-h-0">
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingPage;
