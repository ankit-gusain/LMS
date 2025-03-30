import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-gray-900 md:px-36 text-left w-full mt-10 pt-10 pb-8">
      <div className="flex flex-col md:flex-row items-start px-8 md:px-0 justify-center gap-10 md:gap-32 py-10 border-b border-white/30 text-gray-300">
        <div className="flex flex-col md:items-start items-center w-full">
          <img src={assets.logo_dark} alt="logo" className="mb-4" />
          <p className="text-center md:text-left text-sm text-gray-400">
            Unlock limitless learning with our LMS! Access expert-led courses,
            interactive lessons, certifications — anytime, anywhere. 
            <br /><br />Learn at your pace
            on any device and track progress effortlessly. Grow smarter, faster, and better.
          </p>
        </div>
        <div className="flex flex-col md:items-start items-center w-full">
          <h2 className="font-semibold text-white mb-5">Company</h2>
          <ul className="flex md:flex-col w-full justify-between text-sm text-white/80 md:space-y-2">
            <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
            <li><a href="#" className="hover:text-white transition-colors">About</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
          </ul>
        </div>
        <div className="hidden md:flex flex-col items-start w-full">
          <h2 className="font-semibold text-white mb-5">Subscribe to our newsletter</h2>
          <p className="text-sm text-white/80 mb-4">The latest news, articles, and our resources, sent to your inbox weekly.</p>
          <div className="flex items-center gap-2 pt-4">
            <input
              className="border border-gray-500/30 bg-gray-800 text-gray-500 placeholder-gray-500 outline-none w-64 h-9 rounded px-2 text-sm"
              type="email"
              placeholder="Enter your email"
            />
            <button className="bg-green-800 w-24 h-9 text-white rounded hover:bg-green-700 transition-colors">Subscribe</button>
          </div>
        </div>
      </div>
      <p className="text-white/60 py-4 text-center p-10 text-sm">Copyright &copy; 2025 Ankit Singh. All Rights Reserved.</p>
    </footer>
  )
}
export default Footer;
