import {Link} from 'react-router-dom';
import studentImg from '../assets/student-landing.png';
import logoImg from '../assets/mentora-logo.png';
import Footer from '../components/Footer';

export default function Landing(){
    return (
        <div className="min-h-screen flex flex-col bg-primary">

            <div className="flex flex-1">
            <div className="w-1/2 mt-6 bg-white rounded-r-[500px] flex items-center justify-center overflow-hidden">
                <img src={studentImg} className="w-[100%] rounded-xl" alt="student" />
            </div>

            {/* Right Section */}
            <div className="w-1/2 flex flex-col justify-center items-center text-white px-12">
                <img src={logoImg} alt="mentora logo" className='h-50 mb-15'/>

                <p className="text-3xl text-center w-3/4">
                    "Unified Student Portal for BCA Students, by BCA Students"
                </p>

                <Link to="/login" className='mt-24 bg-white text-primary px-10 py-3 rounded-full shadow-lg font-semibold hover:bg-blue-100 transition-all duration-200'>
                    Log In
                </Link>

                <Link to="/signup" className='mt-4 border border-white px-8 py-3 rounded-full shadow-lg font-semibold hover:bg-blue-500 transition-all duration-200'>
                    Sign Up
                </Link>
            </div>
            </div>
            <Footer />
        </div>
    )
}