import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import logo from "../assets/mentora-logo-og.png";
import { semesterSubjects } from "../../../../shared/constants/subjects.js";
import { useAuth } from "../context/AuthContext";

const DOMAIN_OPTIONS = ["@gmail.com", "@outlook.com", "@ncuindia.edu", "@yahoo.com"];

const BATCH_OPTIONS = ["2022-25", "2023-26", "2024-27", "2025-28"];

const YEAR_SEM_OPTIONS = [
  "1st Year - 1st sem",
  "1st Year - 2nd sem",
  "2nd Year - 3rd sem",
  "2nd Year - 4th sem",
  "3rd Year - 5th sem",
  "3rd Year - 6th sem",
];

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [step, setStep] = useState(1);

  // Step 1
  const [fullName, setFullName] = useState("");
  const [emailLocal, setEmailLocal] = useState("");
  const [emailDomain, setEmailDomain] = useState(DOMAIN_OPTIONS[0]);

  // Step 2
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  // Step 3
  const [batch, setBatch] = useState(BATCH_OPTIONS[0]);
  const [yearSem, setYearSem] = useState(YEAR_SEM_OPTIONS[0]);
  const [cgpa, setCgpa] = useState("");

  // Step 4
  const [rollNumber, setRollNumber] = useState("");
  const [specialization, setSpecialization] = useState(
    "Web Application Development"
  );
  const [selectedCourses, setSelectedCourses] = useState([]);

  // Validation errors
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function validateStep(currentStep) {
    const e = {};
    if (currentStep === 1) {
      if (!fullName.trim()) e.fullName = "Name is required.";
      if (!emailLocal.trim()) e.emailLocal = "Email local part is required.";
      else {
        const ok = /^[a-zA-Z0-9._%+-]+$/.test(emailLocal);
        if (!ok) e.emailLocal = "Invalid characters in email.";
      }
    } else if (currentStep === 2) {
      if (!password) e.password = "Password required.";
      if (!confirmPassword) e.confirmPassword = "Confirm password.";
      if (password && confirmPassword && password !== confirmPassword)
        e.confirmPassword = "Passwords do not match.";
      if (password && password.length < 8)
        e.password = "Password should be at least 8 characters.";
    } else if (currentStep === 3) {
      if (!batch) e.batch = "Select Batch.";
      if (!yearSem) e.yearSem = "Select Year/Semester.";
      if (!cgpa) e.cgpa = "Enter CGPA.";
      else {
        const cg = parseFloat(cgpa);
        if (Number.isNaN(cg) || cg < 0 || cg > 10)
          e.cgpa = "Enter CGPA between 0 and 10.";
      }
    } else if (currentStep === 4) {
      if (!rollNumber) e.rollNumber = "Roll number required.";
      else {
        const re = /^\d{2}BCA\d{3}$/i;
        if (!re.test(rollNumber)) e.rollNumber = "Roll number must be like 2XBCAXXX.";
      }
      if (!specialization) e.specialization = "Choose Specialization.";
      if (!selectedCourses.length) e.selectedCourses = "Select at least one course.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function nextStep() {
    if (validateStep(step)) {
      setStep((s) => s + 1);
      setErrors({});
    }
  }

  function prevStep() {
    setStep((s) => Math.max(1, s - 1));
    setErrors({});
  }

  function toggleCourse(course) {
    setSelectedCourses((prev) =>
      prev.includes(course) ? prev.filter((c) => c !== course) : [...prev, course]
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validateStep(4)) return;

    try {
      setLoading(true);
      setSubmitError("");

      const finalEmail = `${emailLocal}${emailDomain}`.toLowerCase();

      await signup({
        name: fullName,
        email: finalEmail,
        password,
        batch,
        year: yearSem,
        cgpa: parseFloat(cgpa),
        roll: rollNumber.toUpperCase(),
        specialization,
        courses: selectedCourses,
      });

      navigate("/dashboard");
    } catch (error) {
      setSubmitError(
        error?.response?.data?.message ||
        "Signup failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <div className="flex flex-col items-center mt-12 flex-1">

        <div className="flex justify-center items-center gap-6 mb-10">
          <div className="flex flex-col items-center">
            <img src={logo} alt="logo" className="h-25" />
          </div>

          <div className="border-l-2 border-primary h-12"></div>

          <h2 className="text-3xl text-primary font-heading">Sign Up</h2>
        </div>

        <div className="bg-white shadow-xl p-10 rounded-2xl w-[400px]">

          <form onSubmit={handleSubmit}>

            {/* Step indicator */}
            <div className="flex items-center gap-3 mb-6">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold ${step === n ? "bg-primary" : step > n ? "bg-accent text-black" : "bg-gray-300 text-gray-600"
                      }`}
                  >
                    {n}
                  </div>
                  {n < 4 && <div className="w-10 h-0.5 bg-gray-200" />}
                </div>
              ))}
            </div>
            {step === 1 && (
              <div>
                <label className="block text-sm font-semibold text-textMain">Full name</label>
                <input
                  className="mt-1 w-full border-2 border-primary rounded-full px-4 py-2 outline-none"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your name"
                />
                {errors.fullName && <p className="text-sm text-red-600 mt-1">{errors.fullName}</p>}

                <label className="block text-sm font-semibold text-textMain mt-4">Email</label>
                <div className="relative mt-1 flex items-center">
                  <input
                    className="w-full border-2 border-primary rounded-full px-4 py-2 outline-none pr-36"
                    value={emailLocal}
                    onChange={(e) => setEmailLocal(e.target.value)}
                    placeholder="Enter your email"
                  />
                  <select
                    value={emailDomain}
                    onChange={(e) => setEmailDomain(e.target.value)}
                    className="absolute right-0 w-35 h-full bg-primary text-sm text-white rounded-full px-2 cursor-pointer"
                  >
                    {DOMAIN_OPTIONS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.emailLocal && <p className="text-sm text-red-600 mt-1">{errors.emailLocal}</p>}

                <div className="flex flex-col items-center justify-between mt-6">
                  <button
                    type="button"
                    onClick={nextStep}
                    className="mt-6 w-full bg-primary text-white px-6 py-2 border-2 border-primary rounded-full shadow-lg font-semibold cursor-pointer hover:bg-white hover:text-primary hover:border-2 hover:border-primary transition-all duration-200"
                  >
                    Next
                  </button>

                  <p className="mt-6 text-sm text-textMuted">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary font-semibold">
                      Log in
                    </Link>
                  </p>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <label className="block text-sm font-semibold text-textMain">Password</label>
                <div className="relative mt-1">
                  <input
                    type={showPwd ? "text" : "password"}
                    className="w-full border-2 border-primary rounded-full px-4 py-2 outline-none pr-12"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-primary"
                    aria-label="toggle password visibility"
                  >
                    {showPwd ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                  </button>
                </div>
                {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password}</p>}

                <label className="block text-sm font-semibold text-textMain mt-4">Confirm Password</label>
                <input
                  type={showPwd ? "text" : "password"}
                  className="mt-1 w-full border-2 border-primary rounded-full px-4 py-2 outline-none"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                />
                {errors.confirmPassword && <p className="text-sm text-red-600 mt-1">{errors.confirmPassword}</p>}

                <div className="flex flex-col items-center justify-between mt-6">
                  <div className="flex gap-42">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-5 py-1.5 rounded-full border-2 border-gray-300 hover:bg-gray-100 transition-all duration-200"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      className="bg-primary text-white px-5 py-1.5 border-2 border-primary rounded-full shadow hover:bg-white hover:text-primary border transition-all duration-200"
                    >
                      Next
                    </button>
                  </div>
                  <p className="mt-6 text-sm text-textMuted">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary font-semibold">
                      Log in
                    </Link>
                  </p>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <label className="block text-sm font-semibold text-textMain">Batch</label>
                <select
                  className="mt-1 w-full border-2 border-primary rounded-full px-4 py-2 outline-none"
                  value={batch}
                  onChange={(e) => setBatch(e.target.value)}
                >
                  {BATCH_OPTIONS.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
                {errors.batch && <p className="text-sm text-red-600 mt-1">{errors.batch}</p>}

                <label className="block text-sm font-semibold text-textMain mt-4">Year/Semester</label>
                <select
                  className="mt-1 w-full border-2 border-primary rounded-full px-4 py-2 outline-none"
                  value={yearSem}
                  onChange={(e) => setYearSem(e.target.value)}
                >
                  {YEAR_SEM_OPTIONS.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
                {errors.yearSem && <p className="text-sm text-red-600 mt-1">{errors.yearSem}</p>}

                <label className="block text-sm font-semibold text-textMain mt-4">CGPA</label>
                <input
                  className="mt-1 w-full border-2 border-primary rounded-full px-4 py-2 outline-none"
                  value={cgpa}
                  onChange={(e) => setCgpa(e.target.value)}
                  placeholder="e.g., 8.23"
                />
                {errors.cgpa && <p className="text-sm text-red-600 mt-1">{errors.cgpa}</p>}

                <div className="flex items-center justify-between mt-6">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-5 py-1.5 rounded-full border-2 border-gray-300 hover:bg-gray-100 transition-all duration-200"
                    >
                      Back
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={nextStep}
                    className="bg-primary text-white px-5 py-1.5 border-2 border-primary rounded-full shadow hover:bg-white hover:text-primary border transition-all duration-200"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <label className="block text-sm font-semibold text-textMain">Roll Number</label>
                <input
                  className="mt-1 w-full border-2 border-primary rounded-full px-4 py-2 outline-none"
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value.toUpperCase())}
                  placeholder="e.g., 23BCA019"
                />
                {errors.rollNumber && <p className="text-sm text-red-600 mt-1">{errors.rollNumber}</p>}

                <label className="block text-sm font-semibold text-textMain mt-4">Specialization</label>
                <select
                  className="mt-1 w-full border-2 border-primary rounded-full px-4 py-2 outline-none"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                >
                  <option>Web Application Development</option>
                  <option>Mobile Application Development</option>
                </select>
                {errors.specialization && <p className="text-sm text-red-600 mt-1">{errors.specialization}</p>}

                <label className="block text-sm font-semibold text-textMain mt-4">Courses</label>
                <div className="mt-1 flex gap-2 items-center">
                  <select
                    className="w-2/3 border-2 border-primary rounded-full px-4 py-2 outline-none"
                    onChange={(e) => toggleCourse(e.target.value)}
                    value=""
                  >
                    <option value="" disabled>
                      Select Courses
                    </option>
                    {(semesterSubjects[yearSem] || []).map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  <div className="flex-1">
                    {/* chips */}
                    <div className="flex gap-2 flex-wrap">
                      {selectedCourses.map((c) => (
                        <div key={c} className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-full">
                          <span className="text-sm text-primary">{c}</span>
                          <button
                            type="button"
                            onClick={() => toggleCourse(c)}
                            className="text-sm text-primary px-1"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                    {errors.selectedCourses && <p className="text-sm text-red-600 mt-1">{errors.selectedCourses}</p>}
                  </div>
                </div>

                {
                  submitError && (
                    <p className="text-sm text-red-600 mt-4">
                      {submitError}
                    </p>
                  )
                }
                <div className="flex items-center justify-between mt-6">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-5 py-1.5 rounded-full border-2 border-gray-300 hover:bg-gray-100 transition-all duration-200"
                    >
                      Back
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-primary text-white px-5 py-1.5 border-2 border-primary rounded-full shadow hover:bg-white hover:text-primary border transition-all duration-200 disabled:opacity-60"
                  >
                    {loading ? "Creating account..." : "Sign Up"}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}