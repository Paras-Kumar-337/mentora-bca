import { useState } from "react";
import {
  sendResetOtp,
  resetPassword,
} from "../services/authService";

export default function ForgotPassword() {

  const [step, setStep] =
    useState(1);

  const [email, setEmail] =
    useState("");

  const [otp, setOtp] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleSendOtp() {

    try {

      setLoading(true);

      await sendResetOtp(email);

      setStep(2);

      setLoading(false);

    } catch (error) {

      setLoading(false);

      alert(
        error.response?.data?.message
      );
    }
  }

  async function handleReset() {

    try {

      setLoading(true);

      await resetPassword({
        email,
        otp,
        password,
      });

      alert(
        "Password reset successful"
      );

      window.location.href =
        "/login";

    } catch (error) {

      setLoading(false);

      alert(
        error.response?.data?.message
      );
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">

      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md">

        <h1 className="text-2xl font-semibold text-textMain text-center">
          Forgot Password
        </h1>

        {
          step === 1 ? (

            <div className="mt-6 space-y-4">

              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="w-full border border-gray-200 rounded-full px-4 py-3 outline-none focus:border-primary"
              />

              <button
                onClick={handleSendOtp}
                className="w-full bg-primary text-white py-3 rounded-full"
              >
                {
                  loading
                    ? "Sending..."
                    : "Send OTP"
                }
              </button>

            </div>

          ) : (

            <div className="mt-6 space-y-4">

              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value)
                }
                className="w-full border border-gray-200 rounded-full px-4 py-3 outline-none focus:border-primary"
              />

              <input
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="w-full border border-gray-200 rounded-full px-4 py-3 outline-none focus:border-primary"
              />

              <button
                onClick={handleReset}
                className="w-full bg-primary text-white py-3 rounded-full"
              >
                {
                  loading
                    ? "Resetting..."
                    : "Reset Password"
                }
              </button>

            </div>
          )
        }

      </div>

    </div>
  );
}