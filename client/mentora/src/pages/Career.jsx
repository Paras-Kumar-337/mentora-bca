import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import API from '../services/api';
import ReactMarkdown from 'react-markdown';

export default function Career() {
    const [activeTab, setActiveTab] = useState('resume');
    const [userData, setUserData] = useState(null);

    useEffect(() => {
      const storedUser = localStorage.getItem("userInfo");

      if (storedUser) {
        setUserData(JSON.parse(storedUser));
      }
    }, []);

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="max-w-screen-xl mx-auto px-4 md:px-8 py-8 animate-fadeIn">

                {/* Header */}

                <div className="animate-fadeIn">
                    <h1 className="text-2xl md:text-3xl font-semibold text-textMain">
                        Career Support
                    </h1>

                    <p className="text-sm text-textMuted mt-2 max-w-2xl">
                        Build stronger resumes, explore career roadmaps, and get AI-powered placement guidance.
                    </p>
                </div>

                {/* Tabs */}

                <div className="flex flex-col gap-6 mt-6 animate-fadeIn">
                    <button
                        onClick={() => setActiveTab("resume")}
                        className={`px-5 py-2.5 rounded-full border transition-all duration-200 font-medium hover:scale-[1.02] ${activeTab === "resume"
                            ? "bg-primary text-white border-primary"
                            : "border-gray-300 text-textMuted"
                            }`}
                    >
                        Build Resume
                    </button>

                    <button
                        onClick={() => setActiveTab("ai")}
                        className={`px-5 py-2.5 rounded-full border transition-all duration-200 font-medium hover:scale-[1.02] ${activeTab === "ai"
                            ? "bg-primary text-white border-primary"
                            : "border-gray-300 text-textMuted"
                            }`}
                    >
                        Career AI Chat
                    </button>

                    {/* Content */}
                    <div className="mt-8">
                        {activeTab === "resume"
                          ? <ResumeSection userData={userData} />
                          : <AISection userData={userData} />}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}

function ResumeSection({ userData }) {
    const [resumeData, setResumeData] = useState({
        name: userData?.name || "",
        skills: userData?.courses?.join(", ") || "",
        projects: "",
        experience: "",
    });

    const [isImproving, setIsImproving] = useState(false);

    useEffect(() => {
        if (userData) {
            setResumeData({
                name: userData.name || "",
                skills: userData.courses?.join(", ") || "",
                projects: "",
                experience: "",
            });
        }
    }, [userData]);

    async function handleGenerateResume() {
        try {
            setIsImproving(true);

            const { data } = await API.post(
                "/career/improve",
                {
                    ...resumeData,
                    year: userData?.year,
                    specialization: userData?.specialization,
                }
            );

            setResumeData((prev) => ({
                ...prev,
                projects: data.reply,
            }));

            setIsImproving(false);

        } catch (error) {
            console.log(error);
            setIsImproving(false);
        }
    }

    function handleDownloadResume() {

        const resumeContent = `
${resumeData.name}

========================
SKILLS
========================
${resumeData.skills}

========================
PROJECTS
========================
${resumeData.projects}

========================
EXPERIENCE
========================
${resumeData.experience}
`;

        const blob = new Blob(
            [resumeContent],
            { type: "text/plain" }
        );

        const url =
            window.URL.createObjectURL(blob);

        const link =
            document.createElement("a");

        link.href = url;

        link.download = `${resumeData.name || "Mentora_Resume"}.txt`;

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

        window.URL.revokeObjectURL(url);
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fadeIn">
            {/* Tips */}
            <div className="bg-white rounded-3xl shadow hover:shadow-xl transition-all duration-300 p-6 border border-gray-100">
                <h3 className="font-semibold text-textMain">Tips & Tricks</h3>

                <ul className="mt-4 space-y-2 text-sm text-textMuted">
                    <li>1. Specific rather than general</li>
                    <li>2. Active rather than passive</li>
                    <li>3. Written to express not impress</li>
                    <li>4. Articulate rather than “flowery”</li>
                    <li>5. Fact-based (quantify and qualify)</li>
                    <li>6. Written for people who / systems that scan quickly</li>
                    <br />
                    <li>View full tips by Harvard University:</li>
                </ul>

                <a
                    href="https://careerservices.fas.harvard.edu/resources/create-a-strong-resume/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 bg-primary text-white px-4 py-2 border-2 border-primary rounded-full hover:bg-transparent hover:text-primary transition"
                >
                    Tips to Create Strong Resume
                </a>
            </div>

            {/* Form */}
            <div className="bg-white rounded-3xl shadow hover:shadow-xl transition-all duration-300 p-6 border border-gray-100">
                <h3 className="font-semibold text-textMain">Build Your Resume</h3>
                {userData && (
                  <p className="text-sm text-textMuted mt-1">
                    Personalized for {userData.year} • {userData.specialization}
                  </p>
                )}

                <div className="mt-4 space-y-3">

                    <input
                        placeholder="Full Name"
                        value={resumeData.name}
                        onChange={(e) =>
                            setResumeData({
                                ...resumeData,
                                name: e.target.value,
                            })
                        }
                        className="w-full border border-gray-200 rounded-2xl px-4 py-3 shadow-sm focus:border-primary outline-none transition-all duration-200"
                    />

                    <input
                        placeholder="Skills (comma separated)"
                        value={resumeData.skills}
                        onChange={(e) =>
                            setResumeData({
                                ...resumeData,
                                skills: e.target.value,
                            })
                        }
                        className="w-full border border-gray-200 rounded-2xl px-4 py-3 shadow-sm focus:border-primary outline-none transition-all duration-200"
                    />

                    <textarea
                        placeholder="Projects"
                        value={resumeData.projects}
                        onChange={(e) =>
                            setResumeData({
                                ...resumeData,
                                projects: e.target.value,
                            })
                        }
                        className="w-full border border-gray-200 rounded-2xl px-4 py-3 min-h-[120px] shadow-sm focus:border-primary outline-none transition-all duration-200"
                    />

                    <textarea
                        placeholder="Experience"
                        value={resumeData.experience}
                        onChange={(e) =>
                            setResumeData({
                                ...resumeData,
                                experience: e.target.value,
                            })
                        }
                        className="w-full border border-gray-200 rounded-2xl px-4 py-3 min-h-[120px] shadow-sm focus:border-primary outline-none transition-all duration-200"
                    />

                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                    <p className="w-full text-sm text-textMuted">
                        AI-enhanced resume content will be included in the downloadable file.
                    </p>
                    <button
                        onClick={handleGenerateResume}
                        disabled={isImproving}
                        className="bg-primary text-white px-5 py-2.5 rounded-full shadow-lg hover:bg-blue-600 hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isImproving ? "Generating..." : "Generate"}
                    </button>

                    <button
                        onClick={handleDownloadResume}
                        className="border border-gray-300 px-5 py-2.5 rounded-full hover:bg-gray-100 hover:scale-[1.02] transition-all duration-200"
                    >
                        Download Resume
                    </button>
                </div>

            </div>
        </div>
    );
}

function AISection({ userData }) {

    const [messages, setMessages] = useState([
        {
            role: "assistant",
            text: "Hi! I can help with placements, internships, resumes, projects, and career roadmaps.",
        },
    ]);

    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);


    const quickPrompts = [
        "Skills for placements",
        "Best projects for BCA students",
        "Web development roadmap",
        "Internship preparation tips",
        "How to prepare DSA",
    ];


    async function sendMessage(customPrompt = "") {

        const finalInput =
            customPrompt || input;

        if (!finalInput.trim()) return;

        const userMessage = {
            role: "user",
            text: finalInput,
        };

        setMessages((prev) => [
            ...prev,
            userMessage,
        ]);

        setInput("");
        setIsTyping(true);

        try {

            const { data } = await API.post(
                "/career/improve",
                {
                    question: finalInput,
                    year: userData?.year,
                    specialization: userData?.specialization,
                    skills: userData?.courses,
                }
            );

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    text: data.reply,
                },
            ]);

            setIsTyping(false);

        } catch (error) {

            console.log(error);

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    text: "Something went wrong while connecting to Career AI.",
                },
            ]);

            setIsTyping(false);
        }
    }


    return (
        <div className="bg-white rounded-3xl shadow hover:shadow-xl transition-all duration-300 p-6 h-[600px] flex flex-col border border-gray-100 animate-fadeIn">

            <h3 className="font-semibold text-textMain">
                Career Assistant
            </h3>

            {userData && (
                <p className="text-sm text-textMuted mt-1">
                    Helping {userData.year} students with placements, resumes, and career guidance.
                </p>
            )}


            <div className="flex flex-wrap gap-2 mt-4">
                {quickPrompts.map((prompt) => (
                    <button
                        key={prompt}
                        onClick={() => sendMessage(prompt)}
                        className="text-xs px-4 py-2 rounded-full border border-gray-300 hover:border-primary hover:text-primary hover:bg-blue-50 transition-all duration-200 hover:scale-[1.02]"
                    >
                        {prompt}
                    </button>
                ))}
            </div>


            <div className="flex-1 mt-4 overflow-y-auto space-y-4 pr-1">

                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex ${
                            msg.role === "user"
                                ? "justify-end"
                                : "justify-start"
                        }`}
                    >
                        <div
                            className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm ${
                                msg.role === "user"
                                    ? "bg-primary text-white shadow-md"
                                    : "bg-gray-100 text-textMain shadow-sm"
                            }`}
                        >
                            {msg.role === "assistant" ? (
                                <div className="prose prose-sm max-w-none">
                                    <ReactMarkdown>
                                        {msg.text}
                                    </ReactMarkdown>
                                </div>
                            ) : (
                                msg.text
                            )}
                        </div>
                    </div>
                ))}


                {isTyping && (
                    <div className="flex justify-start">
                        <div className="bg-gray-100 px-4 py-3 rounded-2xl text-sm text-textMuted flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-primary animate-bounce"></span>
                            <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:0.15s]"></span>
                            <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:0.3s]"></span>
                        </div>
                    </div>
                )}

            </div>


            <div className="mt-4 flex gap-2">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            sendMessage();
                        }
                    }}
                    placeholder="Ask something..."
                    className="flex-1 border border-gray-200 rounded-full px-4 py-3 shadow-sm focus:border-primary outline-none transition-all duration-200"
                />

                <button
                    onClick={() => sendMessage()}
                    disabled={!input.trim()}
                    className="bg-primary text-white px-5 py-2.5 rounded-full shadow-lg hover:bg-blue-600 hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Send
                </button>
            </div>

        </div>
    );
}