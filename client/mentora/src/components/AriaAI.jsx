import { useState } from "react";
import { BiMessageSquareDots } from "react-icons/bi";
import { FiX, FiSend } from "react-icons/fi";

export default function AriaAI() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { from: "aria", text: "Hi! I’m ARIA — ask me anything about your courses or placements." },
  ]);

  function sendMessage() {
    if (!input.trim()) return;
    setMessages((m) => [...m, { from: "user", text: input }]);
    setTimeout(() => {
      setMessages((m) => [...m, { from: "aria", text: "Sure! I’ll help you craft a strong, clean resume with perfect sections, action-based points, projects, and ATS-friendly formatting." }]);
    }, 700);
    setInput("");
  }

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setOpen(true)}
          className="bg-primary text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition"
          aria-label="Open ARIA Assistant"
        >
          <BiMessageSquareDots size={26} />
        </button>
      </div>

      {/* Drawer */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 flex">
          <div className="w-[360px] max-w-[90vw] h-[520px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            {/* header */}
            <div className="flex items-center justify-between px-4 py-3 bg-primary text-white">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-1 rounded-full">
                  <BiMessageSquareDots size={20} />
                </div>
                <div>
                  <div className="font-semibold">ARIA AI · mentora</div>
                  <div className="text-xs opacity-80">Academic Resource & Intelligence Assistant</div>
                </div>
              </div>

              <button onClick={() => setOpen(false)} className="p-1">
                <FiX size={20} />
              </button>
            </div>

            {/* messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F5F5F5]">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] ${m.from === "aria" ? "bg-white text-textMain ml-0" : "bg-primary text-white ml-auto"} p-3 rounded-3xl`}
                >
                  {m.text}
                </div>
              ))}
            </div>

            {/* input */}
            <div className="p-3 border-t">
              <div className="flex items-center gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Ask ARIA anything..."
                  className="flex-1 border-2 border-gray-200 rounded-full px-4 py-2 outline-none"
                />
                <button
                  onClick={sendMessage}
                  className="bg-primary border-2 border-primary text-white px-4 py-2 rounded-full shadow"
                >
                  <FiSend />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}