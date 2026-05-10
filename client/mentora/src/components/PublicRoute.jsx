import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PublicRoute({ children }) {

  const navigate = useNavigate();

  const storedUser = JSON.parse(
    localStorage.getItem("mentoraUser")
  );

  useEffect(() => {

    if (storedUser) {

      const timer = setTimeout(() => {
        navigate("/dashboard", {
          replace: true,
        });
      }, 1200);

      return () => clearTimeout(timer);
    }

  }, [storedUser, navigate]);

  if (storedUser) {

    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-textMain px-4">

        <div className="bg-white px-8 py-6 rounded-3xl shadow-xl border border-gray-100 text-center max-w-md w-full animate-fadeIn">

          <p className="font-semibold text-xl text-primary">
            Already signed in
          </p>

          <p className="text-textMuted mt-3 leading-relaxed">
            Logged in as
            {" "}
            <span className="text-primary font-semibold">
              {storedUser.name}
            </span>
          </p>

          <p className="text-sm text-textMuted mt-5">
            Redirecting to dashboard...
          </p>

        </div>

      </div>
    );
  }

  return children;
}