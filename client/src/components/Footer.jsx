// all react icons import section
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithubAlt } from "react-icons/fa";
import { TbWorldWww } from "react-icons/tb";

const Footer = () => {
  return (
    <footer className='lg:bg-gray-900 lg:text-white text-slate-800 p-[17.5px] '>
      <div className='container mx-auto text-center flex flex-col lg:flex-row lg:justify-between gap-2 text-base'>
        <p>&copy; 2024 E-Bazar. All rights reserved.</p>

        <div className="flex items-center justify-center gap-4 text-2xl">
          <a href="#" className="hover:text-blue-700">
            <FaFacebook />
          </a>
          <a href="#" className="hover:text-pink-500">
            <FaInstagram />
          </a>
          <a href="#" className="hover:text-blue-400">
            <FaLinkedin />
          </a>
          <a href="#" className="hover:text-gray-700">
            <FaXTwitter />
          </a>
          <a href="#" className="hover:text-violet-500">
            <FaGithubAlt />
          </a>
          <a href="#" className="hover:text-emerald-500">
            <TbWorldWww />
          </a>
        </div>

      </div>
    </footer>
  )
}

export default Footer