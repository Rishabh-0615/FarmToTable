import { Link } from "react-router-dom";
import myimage from "../assets/hero.png";

export const HeroSection = () => {
  return (
    <div className="relative h-[600px] flex items-center justify-center text-center text-white">
      <img src={myimage} alt="Lush farm background" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      <div className="relative z-10 max-w-3xl mx-auto px-4">
        <h1 className="text-5xl font-extrabold mb-6 animate-fade-in">Farm to Table Marketplace</h1>
        <p className="text-lg font-medium mb-8 animate-fade-in animation-delay-200">Easily connect your farm produce to consumers directly.</p>
        <Link
          to="/add-product"
          className="bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-6 rounded-full text-lg transition transform hover:scale-105 duration-300"
        >
          Start Selling Now
        </Link>
      </div>
    </div>
  );
};
