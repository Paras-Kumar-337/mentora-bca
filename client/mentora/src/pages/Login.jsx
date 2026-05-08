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


      navigate("/dashboard");

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

      <div className="flex flex-col items-center mt-12 flex-1">

        <div className="flex items-center gap-6 mb-10">
          <div className="flex flex-col items-center">
            <img src={logo} alt="logo" className="h-25" />
          </div>

          <div className="border-l-2 border-primary h-12"></div>

          <h2 className="text-3xl text-primary font-heading">Log In</h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl p-10 rounded-2xl w-[400px]"
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

          <div className="text-right text-sm text-primary mt-2 cursor-pointer">
            Forgot Password?
          </div>

          {
            error && (
              <p className="text-red-400 text-sm mt-3">
                {error}
              </p>
            )
          }
          
          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full bg-primary text-white px-6 py-2 border-2 border-primary rounded-full shadow-lg font-semibold cursor-pointer hover:bg-white hover:text-primary hover:border-2 hover:border-primary transition-all duration-200 disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Log In"}
          </button>
          <p className="mt-6 text-center text-sm text-textMuted">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-primary font-semibold cursor-pointer">
              Sign Up
            </Link>
          </p>
        </form>

      </div>

      <Footer />

    </div>
  );
}