import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchUserDetails, loginSuccess } from "../features/userAuthSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await axios.post("http://localhost:4000/user/login", {
        email,
        password,
      });
      localStorage.setItem("token", user.data.token);
      console.log(user);

      if (user.status == 200) {
        const data = user.data;

        dispatch(
          loginSuccess({
            token: data.token,
          })
        );

        await dispatch(fetchUserDetails());

        console.log("user logged in", data);

        navigate("/");
      }
    } catch (error) {
      console.log("error", error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 relative">
      {/* Grid background pattern - shadcn style */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      ></div>

      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-sm border border-slate-200 relative z-10">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-slate-500">
            Enter your credentials to sign in to your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-slate-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition"
              placeholder="name@example.com"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-sm font-medium text-slate-700"
              >
                Password
              </label>
              <a
                href="#"
                className="text-xs text-slate-500 hover:text-slate-800"
              >
                Forgot password?
              </a>
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 bg-slate-900 text-white rounded-md text-sm font-medium hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 transition"
          >
            Sign in
          </button>
        </form>

        <div className="text-center text-sm text-slate-500">
          Don't have an account?{" "}
          <a href="#" className="font-medium text-slate-900 hover:underline">
            Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
