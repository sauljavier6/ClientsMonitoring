import { Outlet } from "react-router-dom";

export default function FormLayout () {

  return (
    <div className="flex flex-col min-h-screen">
    <nav className="bg-red-600 text-white px-15 py-2 shadow-md fixed w-full top-0 z-10">
      <div className="flex items-center justify-between  sm:justify-between sm:px-8 px-2">
        <img
          src="/Logo.png"
          alt="logo"
          className="w-20 h-5 rounded-sm sm:w-35 sm:h-15 sm:rounded-lg"
        />
        <div className="flex space-x-2 sm:space-x-4 gap-1 sm:gap-0 ml-4 sm:ml-0">
          <a
            href="https://www.facebook.com/SmartandFinalMexico/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            <img src="/icons/facebook.png" alt="facebook" className="w-5 h-5" />
          </a>
          <a
            href="https://www.instagram.com/smartandfinalmx/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            <img src="/icons/instagram.png" alt="instagram" className="w-5 h-5" />
          </a>
          <a
            href="https://www.youtube.com/c/SmartnfinalMxOficial/videos"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            <img src="/icons/youtube.png" alt="youtube" className="w-5 h-5" />
          </a>
        </div>
      </div>
    </nav>

    <div className="pt-9 sm:pt-[70px] flex-grow w-full">
      <Outlet />
    </div>

    <footer className="bg-gray-100 text-grey-500 mt-8">
        <div className="bg-gray-200 text-center py-4 text-sm">
        <p>&copy; 2025 Smart and final. Todos los derechos reservados. Powered by <span className="font-semibold">S&F Mexico</span>.</p>
        </div>
    </footer>
    </div>
  );
};

