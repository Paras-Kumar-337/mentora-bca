import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ReactMarkdown from "react-markdown";

import API from "../services/api";
import { Trash2, Copy, Check, ImagePlus } from "lucide-react";

export default function AI() {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hey Student! I’m ARIA AI, powered by mentora. Let’s solve your academic and career-related queries." }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const messagesEndRef = useRef(null);

  const quickPrompts = [
    "Create a study plan",
    "Explain recursion simply",
    "Placement preparation tips",
    "Help me with DBMS",
  ];

  async function clearChat() {
    try {
      await API.delete("/study-chat");

      setMessages([
        {
          role: "assistant",
          text: "Hey Paras! I’m ARIA AI, powered by mentora. Let’s solve your academic and career-related queries.",
        },
      ]);

    } catch (error) {
      console.log(error);
    }
  }

  async function copyMessage(text, index) {
    try {
      await navigator.clipboard.writeText(text);

      setCopiedIndex(index);

      setTimeout(() => {
        setCopiedIndex(null);
      }, 2000);

    } catch (error) {
      console.log(error);
    }
  }

  function handleImageUpload(e) {
    const file = e.target.files[0];

    if (!file) return;

    setSelectedImage(file);
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  async function sendMessage(customPrompt) {
    const finalInput =
      customPrompt || input || "Analyze this uploaded image.";

    if (!finalInput.trim() && !selectedImage) return;

    const userMsg = {
      role: "user",
      text: selectedImage
        ? `📎 ${selectedImage.name}\n${finalInput}`
        : finalInput,
    };

    setMessages((prev) => [
      ...prev,
      userMsg,
    ]);

    setInput("");

    try {
      setIsTyping(true);

      const formData = new FormData();

      formData.append(
        "message",
        finalInput
      );

      if (selectedImage) {
        formData.append(
          "image",
          selectedImage
        );
      }

      const { data } = await API.post(
        "/ai/chat",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
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
      setSelectedImage(null);
    } catch (error) {
      console.log(error);

      let errorMessage =
        "Something went wrong while connecting to ARIA.";

      const status = error?.response?.status;

      if (status === 429) {
        errorMessage =
          "ARIA is currently handling too many requests. Please wait a moment and try again.";
      }

      if (status === 503) {
        errorMessage =
          "ARIA is experiencing high demand right now. Please retry in a few moments.";
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: errorMessage,
        },
      ]);

      setIsTyping(false);
      setSelectedImage(null);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <Navbar />

      <main className="flex-1 max-w-screen-xl mx-auto w-full p-6 flex flex-col">

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            Academic Resource & Intelligence Assistant
          </h1>

          <div className="flex items-center gap-3">
            <div className="text-xs px-3 py-1 rounded-full border border-purple-500 text-purple-300">
              ARIA AI
            </div>

            <button
              onClick={clearChat}
              className="flex items-center gap-2 px-3 py-2 rounded-2xl border border-white/10 bg-white/5 text-gray-300 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-300 transition"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        {/* Chat Container */}
        <div className="flex-1 rounded-2xl p-6 flex flex-col backdrop-blur-xl bg-white/5 border border-white/10 shadow-[0_0_40px_rgba(168,85,247,0.2)]">

          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
              >
                <div
                  className={`max-w-[75%] px-5 py-4 text-sm backdrop-blur-md leading-7 ${msg.role === "user"
                      ? "bg-gradient-to-r from-blue-800 to-purple-900 text-white shadow-lg rounded-3xl"
                      : "bg-white/10 text-gray-200 border border-white/10 rounded-3xl"
                    }`}
                >
                  {msg.role === "assistant" ? (
                    <div>
                      <div className="prose prose-invert prose-sm max-w-none text-gray-200">
                        <ReactMarkdown>
                          {msg.text}
                        </ReactMarkdown>
                      </div>

                      <button
                        onClick={() => copyMessage(msg.text, index)}
                        className="mt-3 flex items-center gap-2 text-xs text-gray-400 hover:text-purple-300 transition"
                      >
                        {copiedIndex === index ? (
                          <>
                            <Check size={14} />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy size={14} />
                            Copy
                          </>
                        )}
                      </button>
                    </div>
                  ) : (
                    msg.text
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="px-5 py-4 rounded-3xl bg-white/10 border border-white/10 text-gray-300 text-sm backdrop-blur-md flex items-center gap-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce"></span>
                    <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce [animation-delay:0.15s]"></span>
                    <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce [animation-delay:0.3s]"></span>
                  </div>

                  ARIA is thinking...
                </div>
              </div>
            )}

            <div ref={messagesEndRef}></div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => sendMessage(prompt)}
                className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300 hover:border-purple-500 hover:text-white transition"
              >
                {prompt}
              </button>
            ))}
          </div>
          {/* Input */}
          <div className="mt-4 flex gap-2 items-center">
            <label className="cursor-pointer flex items-center justify-center w-12 h-12 rounded-full bg-white/10 border border-white/10 hover:border-purple-500 transition">
              <ImagePlus size={20} className="text-gray-300" />

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask ARIA anything..."
              className="flex-1 bg-white/10 border border-white/10 rounded-full px-4 py-3 outline-none text-white placeholder-gray-400 backdrop-blur-md focus:border-purple-500"
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />

            {selectedImage && (
              <div className="px-4 py-2 rounded-2xl bg-white/10 border border-white/10 text-xs text-gray-300 max-w-[220px] truncate">
                📎 {selectedImage.name}
              </div>
            )}

            <button
              onClick={sendMessage}
              disabled={!input.trim() && !selectedImage}
              className={`px-5 py-3 rounded-full text-white transition ${input.trim() || selectedImage
                  ? "bg-gradient-to-r from-pink-500 to-purple-600 shadow-[0_0_20px_rgba(236,72,153,0.6)] hover:scale-105"
                  : "bg-gray-700 cursor-not-allowed opacity-50"
                }`}
            >
              <svg
                fill="#ffffff"
                viewBox="0 0 31.806 31.806"
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
              >
                <path d="M1.286,12.465c-0.685,0.263-1.171,0.879-1.268,1.606c-0.096,0.728,0.213,1.449,0.806,1.88l6.492,4.724L30.374,2.534 L9.985,22.621l8.875,6.458c0.564,0.41,1.293,0.533,1.964,0.33c0.67-0.204,1.204-0.713,1.444-1.368l9.494-25.986 c0.096-0.264,0.028-0.559-0.172-0.756c-0.199-0.197-0.494-0.259-0.758-0.158L1.286,12.465z"></path>
                <path d="M5.774,22.246l0.055,0.301l1.26,6.889c0.094,0.512,0.436,0.941,0.912,1.148c0.476,0.206,1.025,0.162,1.461-0.119 c1.755-1.132,4.047-2.634,3.985-2.722L5.774,22.246z"></path>
              </svg>
            </button>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}