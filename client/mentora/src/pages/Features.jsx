import Navbar from "../components/Navbar";
import {
  BarChart3,
  Briefcase,
  Users,
  Bot,
} from "lucide-react";

export default function Features() {
  return (
    <div className="min-h-screen bg-primary text-white font-body">
      <Navbar />

      <main className="max-w-screen-xl mx-auto px-6 md:px-8 py-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold text-textMain">
            Features
          </h1>

          <p className="text-white/80 mt-3 max-w-3xl leading-relaxed">
            Mentora combines academics, AI assistance, career preparation, and student interaction into a single platform designed specifically for BCA students.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">

          <div className="bg-white rounded-2xl shadow p-6 hover:-translate-y-1 transition-all duration-200">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <BarChart3 size={28} />
            </div>

            <h3 className="font-semibold text-primary mt-4 text-lg">
              Academic Dashboard
            </h3>

            <p className="text-black mt-3 text-sm leading-relaxed">
              Track attendance, SGPA/CGPA, academic performance, tasks, and semester progress through a centralized personalized dashboard.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6 hover:-translate-y-1 transition-all duration-200">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <Briefcase size={28} />
            </div>

            <h3 className="font-semibold text-primary mt-4 text-lg">
              Career Support
            </h3>

            <p className="text-black mt-3 text-sm leading-relaxed">
              Build resumes, receive AI-powered career guidance, explore placement preparation strategies, and improve internship readiness.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6 hover:-translate-y-1 transition-all duration-200">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <Users size={28} />
            </div>

            <h3 className="font-semibold text-primary mt-4 text-lg">
              Student Community
            </h3>

            <p className="text-black mt-3 text-sm leading-relaxed">
              Interact with fellow students, share discussions, reply to posts, and collaborate on academics, placements, and campus life.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6 hover:-translate-y-1 transition-all duration-200">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <Bot size={28} />
            </div>

            <h3 className="font-semibold text-primary mt-4 text-lg">
              ARIA AI Assistant
            </h3>

            <p className="text-black mt-3 text-sm leading-relaxed">
              Multimodal AI assistant with image understanding, personalized semester guidance, attendance awareness, academic help, and productivity support.
            </p>
          </div>

        </div>

        <div className="mt-16 bg-white/10 border border-white/10 rounded-3xl p-8 md:p-10 backdrop-blur-sm">

          <h2 className="text-2xl md:text-3xl font-semibold text-white">
            Why Mentora?
          </h2>

          <p className="text-white/80 mt-4 leading-relaxed max-w-4xl">
            Mentora was built specifically for BCA students at The NorthCap University to simplify academic tracking, career preparation, AI assistance, and student collaboration through one integrated ecosystem.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

            <div className="bg-white rounded-2xl p-6 text-primary shadow">
              <h3 className="text-3xl font-bold">4+</h3>
              <p className="mt-2 text-sm text-black">
                Integrated student-focused modules
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 text-primary shadow">
              <h3 className="text-3xl font-bold">AI</h3>
              <p className="mt-2 text-sm text-black">
                Personalized academic and career assistance
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 text-primary shadow">
              <h3 className="text-3xl font-bold">NCU</h3>
              <p className="mt-2 text-sm text-black">
                Designed around BCA curriculum and workflows
              </p>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}