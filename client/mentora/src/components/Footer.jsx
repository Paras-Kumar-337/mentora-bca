export default function Footer() {
  return (
    <footer className="w-full bg-gray-700 text-white mt-20 border-t border-white/10">

      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-8">

        <div className="flex flex-col md:flex-row justify-between gap-8">

          <div className="max-w-md">
            <h2 className="text-2xl font-semibold tracking-wide">
              Mentora
            </h2>

            <p className="text-white/70 mt-3 text-sm leading-relaxed">
              An integrated student ecosystem for BCA students at The NorthCap University.
            </p>
          </div>


          <div className="flex flex-col gap-3 text-sm text-white/70">

            <div className="flex flex-col gap-2">
              <p>Paras Kumar</p>
              <p>Pragati Yadav</p>
              <p>Komal Yadav</p>
            </div>

            <a
              href="mailto:anejaparas337@gmail.com"
              className="inline-flex items-center gap-2 w-fit px-4 py-2 rounded-full bg-white/10 hover:bg-white hover:text-primary transition-all duration-200 border border-white/10 shadow-sm backdrop-blur-sm"
            >
              Contact Developer
            </a>

          </div>

        </div>


        <div className="border-t border-white/10 mt-8 pt-5 flex flex-col md:flex-row justify-between gap-3 text-sm text-white/50">

          <p>
            © {new Date().getFullYear()} Mentora
          </p>

          <p>
            Built for BCA students at NCU.
          </p>

        </div>

      </div>

    </footer>
  );
}