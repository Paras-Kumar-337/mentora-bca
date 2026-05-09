import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

export default function Profile() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    batch: "",
    year: "",
    cgpa: "",
    sgpa: "",
    roll: "",
    specialization: "",
    courses: [],
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  useEffect(() => {

    async function fetchProfile() {

        try {

            const { data } = await API.get(
                "/auth/profile"
            );

            setForm((prev) => ({
                ...prev,
                name: data.name || "",
                email: data.email || "",
                batch: data.batch || "",
                year: data.year || "",
                cgpa: data.cgpa || "",
                sgpa: data.sgpa || "",
                roll: data.roll || "",
                specialization:
                    data.specialization || "",
                courses: data.courses || [],
            }));

        } catch (error) {

            console.log(error);
        }
    }

    fetchProfile();

}, []);

async function handleSaveProfile() {

    if (
        form.password &&
        form.password !==
        form.confirmPassword
    ) {
        alert("Passwords do not match");
        return;
    }

    try {

        const payload = {
            name: form.name,
            email: form.email,
            batch: form.batch,
            year: form.year,
            cgpa: form.cgpa,
            sgpa: form.sgpa,
            roll: form.roll,
            specialization:
                form.specialization,
            courses: form.courses,
        };

        if (form.password.trim()) {
            payload.password =
                form.password;
        }

        await API.put(
            "/auth/profile",
            payload
        );

        alert("Profile updated successfully");

    } catch (error) {

        console.log(error);
        alert("Failed to update profile");
    }
}

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-screen-xl mx-auto px-4 md:px-8 py-8 animate-fadeIn">
        <div className="animate-fadeIn">
          <h1 className="text-2xl md:text-3xl font-semibold text-textMain">
            Your Profile
          </h1>

          <p className="text-sm text-textMuted mt-2 max-w-2xl">
            Manage your personal details, academic preferences, and account settings.
          </p>
        </div>

        <div className="mt-6 bg-white rounded-3xl shadow hover:shadow-xl transition-all duration-300 p-6 md:p-8 border border-gray-100 animate-fadeIn">

          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Personal Info */}
            <h3 className="col-span-1 md:col-span-2 text-sm font-semibold text-textMuted uppercase tracking-wide">
              Personal Information
            </h3>

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="border border-gray-200 rounded-full px-4 py-3 shadow-sm focus:border-primary outline-none transition-all duration-200"
            />

            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="border border-gray-200 rounded-full px-4 py-3 shadow-sm focus:border-primary outline-none transition-all duration-200"
            />

            {/* Security */}
            <h3 className="col-span-1 md:col-span-2 text-sm font-semibold text-textMuted uppercase tracking-wide mt-4">
              Security
            </h3>

            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              type="password"
              className="border border-gray-200 rounded-full px-4 py-3 shadow-sm focus:border-primary outline-none transition-all duration-200"
            />

            <input
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              type="password"
              className="border border-gray-200 rounded-full px-4 py-3 shadow-sm focus:border-primary outline-none transition-all duration-200"
            />

            {/* Academic */}
            <h3 className="col-span-1 md:col-span-2 text-sm font-semibold text-textMuted uppercase tracking-wide mt-4">
              Academic Details
            </h3>

            <select
              name="batch"
              value={form.batch}
              onChange={handleChange}
              className="border border-gray-200 rounded-full px-4 py-3 shadow-sm focus:border-primary outline-none transition-all duration-200"
            >
              <option>2022-25</option>
              <option>2023-26</option>
              <option>2024-27</option>
              <option>2025-28</option>
            </select>

            <select
              name="year"
              value={form.year}
              onChange={handleChange}
              className="border border-gray-200 rounded-full px-4 py-3 shadow-sm focus:border-primary outline-none transition-all duration-200"
            >
              <option>1st Year - 1st sem</option>
              <option>1st Year - 2nd sem</option>
              <option>2nd Year - 3rd sem</option>
              <option>2nd Year - 4th sem</option>
              <option>3rd Year - 5th sem</option>
              <option>3rd Year - 6th sem</option>
            </select>

            <input
              name="cgpa"
              value={form.cgpa}
              onChange={handleChange}
              placeholder="CGPA"
              className="border border-gray-200 rounded-full px-4 py-3 shadow-sm focus:border-primary outline-none transition-all duration-200"
            />
            <input
              name="sgpa"
              value={form.sgpa}
              onChange={handleChange}
              placeholder="Current Semester SGPA"
              className="border border-gray-200 rounded-full px-4 py-3 shadow-sm focus:border-primary outline-none transition-all duration-200"
            />

            <input
              name="roll"
              value={form.roll}
              onChange={handleChange}
              placeholder="Roll Number"
              className="border border-gray-200 rounded-full px-4 py-3 shadow-sm focus:border-primary outline-none transition-all duration-200"
            />

            {/* Preferences */}
            <h3 className="col-span-1 md:col-span-2 text-sm font-semibold text-textMuted uppercase tracking-wide mt-4">
              Preferences
            </h3>

            <select
              name="specialization"
              value={form.specialization}
              onChange={handleChange}
              className="border border-gray-200 rounded-full px-4 py-3 col-span-1 md:col-span-2 shadow-sm focus:border-primary outline-none transition-all duration-200"
            >
              <option>Web Application Development</option>
              <option>Mobile Application Development</option>
            </select>

            <select
              multiple
              className="border border-gray-200 rounded-2xl px-4 py-3 col-span-1 md:col-span-2 h-32 shadow-sm focus:border-primary outline-none transition-all duration-200"
            >
              <option>Software Engineering</option>
              <option>Entrepreneurship</option>
              <option>Intro to AI/ML</option>
              <option>FMAD</option>
            </select>

          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4">

            <button className="text-red-500 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-full font-medium transition-all duration-200 hover:scale-[1.02]">
              Logout
            </button>

            <div className="flex gap-3">
              <button className="border border-gray-300 px-5 py-2.5 rounded-full hover:bg-gray-100 hover:scale-[1.02] transition-all duration-200">
                Cancel
              </button>

              <button
                onClick={handleSaveProfile}
                className="bg-primary text-white px-5 py-2.5 rounded-full shadow-lg hover:bg-blue-600 hover:scale-[1.02] transition-all duration-200"
              >
                Save Changes
              </button>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}