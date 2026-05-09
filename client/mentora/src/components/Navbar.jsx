import logo from "../assets/mentora-logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isPublicPage = ["/", "/login", "/signup"].includes(location.pathname);
  const isLoggedIn =
    !!localStorage.getItem("token") ||
    !!localStorage.getItem("userInfo");

  function handleLogout() {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");

    navigate("/login");
  }

  return (
    <header className="w-full bg-primary text-white flex items-center justify-between px-6 md:px-10 py-4">

      <div className="flex items-center gap-2">
        {isLoggedIn ? (
          <Link to="/dashboard">
            <img
              src={logo}
              alt="Mentora Logo"
              className="h-10 cursor-pointer hover:opacity-50 transition"
            />
          </Link>
        ) : (
          <img
            src={logo}
            alt="Mentora Logo"
            className="h-10 opacity-90 cursor-default"
          />
        )}
      </div>

      <nav className="flex items-center gap-4 md:gap-6 text-sm md:text-lg font-body">

        {location.pathname !== "/" && (
          <button
            onClick={() => navigate(-1)}
            className="border border-white/30 px-3 py-1 rounded-full hover:bg-white hover:text-primary transition"
          >
            ← Back
          </button>
        )}

        <Link to="/features">Features</Link>
        <Link to="/about">About</Link>

        {!isPublicPage && (
          <button
            onClick={handleLogout}
            className="border border-white/30 px-3 py-1 rounded-full hover:bg-red-500 hover:text-white transition"
          >
            Log Out
          </button>
        )}

      </nav>

    </header>
  );
}