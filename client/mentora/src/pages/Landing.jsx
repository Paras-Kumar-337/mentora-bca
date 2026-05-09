import {Link} from 'react-router-dom';
import studentImg from '../assets/student-landing.png';
import logoImg from '../assets/mentora-logo.png';
import Footer from '../components/Footer';

export default function Landing(){
    return (
        <div className="min-h-screen flex flex-col bg-primary">

            <div className="flex flex-col lg:flex-row flex-1">
            <div className="w-full lg:w-1/2 mt-0 lg:mt-6 bg-white lg:rounded-r-[500px] flex items-center justify-center overflow-hidden px-4 py-8 animate-fadeIn">
                <img
                  src={studentImg}
                  className="w-full max-w-[650px] rounded-3xl drop-shadow-xl hover:scale-[1.01] transition-all duration-300"
                  alt="student"
                />
            </div>

            {/* Right Section */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center text-white px-6 md:px-12 py-12 text-center animate-fadeIn">
                <img
                  src={logoImg}
                  alt="mentora logo"
                  className="h-36 md:h-44 lg:h-50 mb-10 md:mb-14 drop-shadow-lg"
                />

                <p className="text-2xl md:text-3xl text-center max-w-xl leading-relaxed font-medium">
                    "Unified Student Portal for BCA Students, by BCA Students"
                </p>

                <Link
                  to="/login"
                  className="mt-16 md:mt-20 bg-white text-primary px-10 py-3 rounded-full shadow-xl font-semibold hover:bg-blue-100 hover:scale-[1.02] transition-all duration-200"
                >
                    Log In
                </Link>

                <Link
                  to="/signup"
                  className="mt-4 border border-white px-8 py-3 rounded-full shadow-lg font-semibold hover:bg-blue-500 hover:scale-[1.02] transition-all duration-200"
                >
                    Sign Up
                </Link>
            </div>
            </div>
            <Footer />
        </div>
    )
}