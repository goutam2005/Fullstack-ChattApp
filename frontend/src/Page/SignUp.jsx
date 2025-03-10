import React, { useState } from "react";
import { useAuthStore } from "../Store/authStore";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../Components/AuthImagePattern";
import toast from "react-hot-toast";

function SignUp() {
  const { SignUp, isSignIn } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const validateForm = () => {
    console.log("validateForm called");
    if (!formData.username || !formData.email || !formData.password) {
      return toast.error("All fields are required");
    }
    if (formData.password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      return toast.error("Invalid email address");
    }
    return true;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()===true) {
      SignUp(formData);
    }
    
  };
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-base-500">
      {/* left-side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 bg-base-400">
        <div className="w-full max-w-md p-5 space-y-8">
          <div className="text-center mb-8">
            <div className="flex flex-col gap-2 group items-center">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="font-bold text-2xl mt-2">Create an account</h1>
              <p className="text-base-content/60">
                Get started with your free account
              </p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <User className="size-6 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className={"input input-bordered rounded-lg w-full pl-10"}
                  placeholder="Username"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                ></input>
              </div>
            </div>
            <div className="form-control">
              <label className="labe">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Mail className="size-6 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className={"input input-bordered rounded-lg w-full pl-10"}
                  placeholder="example@gmail.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                ></input>
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock className="size-6 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={"input input-bordered rounded-lg w-full pl-10"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                ></input>
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-6 text-base-content/40" />
                  ) : (
                    <Eye className="size-6 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>
            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn btn-primary rounded-lg"
                disabled={isSignIn}
              >
                {isSignIn ? (
                  <>
                    <Loader2 className="size-6 animate-spin" />
                    <span className="ml-2">Loading...</span>
                  </>
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>
          </form>
          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
      {/* right side */}
      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share photos and videos, and have fun with your family and friends."
      />
    </div>
  );
}

export default SignUp;
