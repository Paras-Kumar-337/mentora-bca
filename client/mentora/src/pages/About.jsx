import Navbar from "../components/Navbar";
import logoImg from '../assets/mentora-logo.png';

export default function About() {
  return (
    <div className="min-h-screen bg-primary text-white font-body">
      <Navbar />

      <main className="max-w-screen-xl mx-auto px-6 md:px-8 py-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold text-textMain">
            About Mentora
          </h1>

          <p className="text-white/80 mt-3 max-w-3xl leading-relaxed">
            Mentora is an integrated student ecosystem designed specifically for BCA students at The NorthCap University, combining academics, AI assistance, career preparation, and student collaboration into one platform.
          </p>
        </div>

        <div className="flex justify-center mt-16 mb-16">
          <div className="bg-white/10 border border-white/10 rounded-3xl px-10 py-8 backdrop-blur-sm shadow-lg">
            <img
              src={logoImg}
              alt="Mentora"
              className="h-40 w-auto"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">

          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold text-primary">
              What Mentora Offers
            </h2>

            <p className="mt-4 text-black text-sm leading-relaxed">
              Mentora helps students manage academics, monitor attendance, track SGPA/CGPA, collaborate through community discussions, prepare for placements, and receive AI-powered guidance through ARIA.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold text-primary">
              Why It Was Built
            </h2>

            <p className="mt-4 text-black text-sm leading-relaxed">
              Built around the workflows and curriculum of BCA students at NCU, Mentora aims to simplify academic management while creating a centralized ecosystem for productivity, career growth, and collaboration.
            </p>
          </div>

        </div>

        <h2 className="text-2xl mt-14 font-semibold text-textMain">
          Developed By
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

          <div className="bg-white rounded-2xl shadow p-8 flex flex-col items-center justify-center text-center hover:-translate-y-1 transition-all duration-200">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img
                src="/team/paras.png"
                alt="Paras Kumar"
                className="w-full h-full object-cover"
              />
            </div>

            <h3 className="mt-4 font-semibold text-primary">
              Paras Kumar
            </h3>

            <p className="text-sm text-textMuted mt-1">
              23BCA019
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-8 flex flex-col items-center justify-center text-center hover:-translate-y-1 transition-all duration-200">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img
                src="/team/pragati.jpg"
                alt="Pragati Yadav"
                className="w-full h-full object-cover"
              />
            </div>

            <h3 className="mt-4 font-semibold text-primary">
              Pragati Yadav
            </h3>

            <p className="text-sm text-textMuted mt-1">
              23BCA020
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-8 flex flex-col items-center justify-center text-center hover:-translate-y-1 transition-all duration-200">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img
                src="/team/komal.jpg"
                alt="Komal Yadav"
                className="w-full h-full object-cover"
              />
            </div>

            <h3 className="mt-4 font-semibold text-primary">
              Komal Yadav
            </h3>

            <p className="text-sm text-textMuted mt-1">
              23BCA040
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}