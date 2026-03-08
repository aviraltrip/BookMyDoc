import { useNavigate } from 'react-router-dom';

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="flex flex-col md:flex-row items-center justify-between rounded-2xl px-6 sm:px-10 md:px-16 py-12 md:py-16 my-8 mx-4 md:mx-8 lg:mx-20 text-white"
      style={{ backgroundColor: '#3b82f6' }} // actual blue color (#3b82f6 = Tailwind blue-500)
    >
      {/* Left Side - Text + Button */}
      <div className="flex-1 text-center md:text-left max-w-2xl">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
          Book Appointment
        </h2>
        
        <p className="mt-5 text-xl sm:text-2xl md:text-3xl opacity-90">
          With 100+ Trusted Doctors
        </p>

        <button
          onClick={() => {
            navigate('/login');
            window.scrollTo(0, 0);
          }}
          className="mt-8 px-9 py-4 bg-white font-semibold text-lg rounded-xl shadow-lg
                     hover:bg-gray-100 active:bg-gray-200 transition-colors duration-150"
          style={{ color: '#3b82f6' }} // text color matches banner background
        >
          Create Account
        </button>
      </div>

      {/* Right side intentionally empty – clean look without image */}
    </div>
  );
};

export default Banner;