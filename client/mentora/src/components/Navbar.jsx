import logo from "../assets/mentora-logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isPublicPage = ["/", "/login", "/signup"].includes(location.pathname);

  function handleLogout() {
    localStorage.removeItem("mentoraUser");

    navigate("/", {
      replace: true,
    });

    window.location.reload();
  }

  return (
    <header className="w-full bg-primary text-white flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 px-4 sm:px-6 md:px-10 py-4">

      <div className="flex items-center gap-2">
        {isPublicPage ? (
          <img
            src={logo}
            alt="Mentora Logo"
            className="h-10 opacity-90 cursor-default"
          />
        ) : (
          <Link to="/dashboard">
            <img
              src={logo}
              alt="Mentora Logo"
              className="h-10 cursor-pointer hover:opacity-50 transition"
            />
          </Link>
        )}
      </div>

      <nav className="flex flex-wrap items-center justify-center md:justify-end gap-3 md:gap-6 text-sm md:text-lg font-body w-full md:w-auto text-center">

        {location.pathname !== "/" && (
          <button
            onClick={() => {
              const isLoggedIn =
                localStorage.getItem("mentoraUser");

              navigate(
                isLoggedIn ? "/dashboard" : "/",
                {
                  replace: true,
                }
              );
            }}
            className="border border-white/30 px-3 py-1 rounded-full hover:bg-white hover:text-primary transition-all duration-200 whitespace-nowrap"
          >
            ← Back
          </button>
        )}

        <Link
          to="/features"
          className="hover:opacity-80 transition-all duration-200"
        >
          Features
        </Link>
        <Link
          to="/about"
          className="hover:opacity-80 transition-all duration-200"
        >
          About
        </Link>

        {!isPublicPage && (
          <button
            onClick={handleLogout}
            className="border border-white/30 px-3 py-1 rounded-full hover:bg-red-500 hover:text-white transition-all duration-200 whitespace-nowrap"
          >
            Log Out
          </button>
        )}

      </nav>

    </header>
  );
}