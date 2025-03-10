import React from "react";
import { useAuthStore } from "../Store/authStore";
import { Camera, Mail, User } from "lucide-react";

function ProfilePage() {
  const { authUser, updateProfile, isUpdateProfile } = useAuthStore();
 const [selectedImg, setselectedImg] = React.useState(null);
  const handdleChangeProfile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader()
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const base64Image = reader.result
      setselectedImg(base64Image);
      const res = await updateProfile({ profilePic: base64Image });
      console.log("res", res);
    }

  };
  return (
    <div className=" pt-20  flex items-center justify-center bg-base-100">
      <div className="max-w-4xl  mx-auto p-6 md:p-8 w-full">
        <div className="bg-base-300 shadow-2xl border border-base-200 rounded-3xl p-6 md:p-8 space-y-8 transition-all duration-300 hover:shadow-3xl">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-base-content mb-2">
              Profile
            </h1>
            <p className="text-lg text-zinc-500">Your profile information</p>
          </div>

          {/* Profile Picture Section */}
          <div className="flex flex-col items-center gap-6">
            <div className="relative group">
              <img
                src={
                  selectedImg ||
                  authUser?.profilePic ||
                  "https://img.icons8.com/?size=100&id=LPk9CY756Am8&format=png&color=000000"
                }
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-base-100 shadow-lg transition-all duration-300 hover:scale-105 hover:border-primary"
              />
              <label
                htmlFor="upload"
                className={`absolute bottom-1 right-1 bg-base-content rounded-full p-2 cursor-pointer
              shadow-md transition-all duration-300 hover:scale-110 hover:bg-opacity-90
              ${
                isUpdateProfile
                  ? "animate-pulse pointer-events-none opacity-50"
                  : ""
              }
            `}
              >
                <Camera className="w-6 h-6 text-white" />
                <input
                  type="file"
                  id="upload"
                  onChange={handdleChangeProfile}
                  disabled={isUpdateProfile}
                  className="hidden"
                  accept="image/*"
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdateProfile
                ? "Updating..."
                : "Click the camera icon to update profile picture"}
            </p>
          </div>

          {/* User Information Section */}
          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-5 h-5" /> Username
              </div>
              <p className="px-4 py-2.5 bg-base-200 border rounded-lg text-base-content">
                {authUser?.username}
              </p>
            </div>
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-5 h-5" /> Email
              </div>
              <p className="px-4 py-2.5 bg-base-200 border rounded-lg text-base-content">
                {authUser?.email}
              </p>
            </div>
          </div>

          {/* Account Information Section */}
          <div className="mt-6 bg-base-300 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-base-content">
              Account Information
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span className="text-zinc-400">Member Since</span>
                <span className="text-base-content">
                  {new Date(authUser?.createdAt).toISOString().split("T")[0]}
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-zinc-400">Account Status</span>
                <span className="text-green-500 font-medium">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
