import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-green-200 text-green-800 py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col items-center md:items-start">
          <img src="/logo.svg" alt="Farm to Table Logo" className="w-16 h-16" />
          <p className="mt-2 text-center md:text-left">Connecting farmers and consumers directly.</p>
        </div>
        <div className="flex flex-col items-center md:items-start">
          <h3 className="font-semibold text-lg mb-2">Contact Us</h3>
          <p>Email: <a href="mailto:info@farmtotable.com" className="hover:text-green-600 transition-colors underline">info@farmtotable.com</a></p>
          <p>Phone: <a href="tel:1234567890" className="hover:text-green-600 transition-colors underline">(123) 456-7890</a></p>
        </div>
        <div className="flex flex-col items-center md:items-start">
          <h3 className="font-semibold text-lg mb-2">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-green-600 transition-colors underline">Facebook</a>
            <a href="#" className="hover:text-green-600 transition-colors underline">Twitter</a>
            <a href="#" className="hover:text-green-600 transition-colors underline">Instagram</a>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-8 pt-4 border-t border-green-800/20 flex flex-col md:flex-row justify-between items-center">
        <p className="text-center md:text-left">&copy; 2023 Farm to Table Marketplace. All rights reserved.</p>
        <Link to="/terms" className="hover:text-green-600 transition-colors underline mt-4 md:mt-0 mr-3">Terms of Service</Link>
      </div>
    </footer>
  );
};
