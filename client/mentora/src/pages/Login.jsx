import { useState } from "react";
import InputField from "../components/InputField";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/mentora-logo-og.png";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      setError("");


      await login({
        email,
        password,
      });


      navigate("/dashboard", {
        replace: true,
      });

    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Login failed"
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">

      <Navbar />

      <div className="flex flex-col items-center mt-10 md:mt-12 flex-1 px-4 animate-fadeIn">

        <div className="flex flex-col md:flex-row items-center gap-5 md:gap-6 mb-10 text-center md:text-left">
          <div className="flex flex-col items-center">
            <img
              src={logo}
              alt="logo"
              className="h-24 md:h-25 drop-shadow-lg hover:scale-[1.02] transition-all duration-300"
            />
          </div>

          <div className="hidden md:block border-l-2 border-primary h-12"></div>

          <div>
            <h2 className="text-3xl text-primary font-heading">
              Log In
            </h2>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl hover:shadow-2xl transition-all duration-300 p-6 md:p-10 rounded-3xl w-full max-w-[420px] border border-gray-100"
        >

          <InputField
            label="Email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <InputField
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Link
            to="/forgot-password"
            className="text-primary hover:underline"
          >
            Forgot Password?
          </Link>

          {
            error && (
              <p className="text-red-500 bg-red-50 border border-red-100 rounded-xl px-3 py-2 text-sm mt-4 animate-fadeIn">
                {error}
              </p>
            )
          }

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full bg-primary text-white px-6 py-3 border-2 border-primary rounded-full shadow-lg font-semibold cursor-pointer hover:bg-white hover:text-primary hover:border-primary hover:scale-[1.01] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Log In"}
          </button>
          <p className="mt-6 text-center text-sm text-textMuted">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-primary font-semibold cursor-pointer hover:opacity-80 transition-all duration-200"
            >
              Sign Up
            </Link>
          </p>
        </form>

      </div>

      <Footer />

    </div>
  );
}