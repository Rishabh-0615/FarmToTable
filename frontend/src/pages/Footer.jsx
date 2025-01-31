// import { Link } from "react-router-dom";

// export const Footer = () => {
//   return (
//     <footer className="bg-green-200 text-green-800 py-8">
//       <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
//         <div className="flex flex-col items-center md:items-start">
//           <img src="/logo.svg" alt="Farm to Table Logo" className="w-16 h-16" />
//           <p className="mt-2 text-center md:text-left">Connecting farmers and consumers directly.</p>
//         </div>
//         <div className="flex flex-col items-center md:items-start">
//           <h3 className="font-semibold text-lg mb-2">Contact Us</h3>
//           <p>Email: <a href="mailto:info@farmtotable.com" className="hover:text-green-600 transition-colors underline">info@farmtotable.com</a></p>
//           <p>Phone: <a href="tel:1234567890" className="hover:text-green-600 transition-colors underline">(123) 456-7890</a></p>
//         </div>
//         <div className="flex flex-col items-center md:items-start">
//           <h3 className="font-semibold text-lg mb-2">Follow Us</h3>
//           <div className="flex space-x-4">
//             <a href="#" className="hover:text-green-600 transition-colors underline">Facebook</a>
//             <a href="#" className="hover:text-green-600 transition-colors underline">Twitter</a>
//             <a href="#" className="hover:text-green-600 transition-colors underline">Instagram</a>
//           </div>
//         </div>
//       </div>
//       <div className="container mx-auto mt-8 pt-4 border-t border-green-800/20 flex flex-col md:flex-row justify-between items-center">
//         <p className="text-center md:text-left">&copy; 2025 Farm to Table Marketplace. All rights reserved.</p>
//         <Link to="/terms" className="hover:text-green-600 transition-colors underline mt-4 md:mt-0 mr-3">Terms of Service</Link>
//       </div>
//     </footer>
//   );
// };


import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-green-600 to-green-700 text-white py-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        {/* Logo and Description */}
        <div className="flex flex-col items-center md:items-start">
          <img src="/logo.svg" alt="Farm to Table Logo" className="w-28 h-28 mb-6" />
          <p className="text-lg font-semibold text-center md:text-left tracking-wide leading-relaxed">
            Connecting farmers and consumers directly for a healthier, sustainable future.
          </p>
        </div>

        {/* Contact Us */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-2xl font-bold mb-4 text-yellow-300">Contact Us</h3>
          <p className="mb-2 text-lg font-medium">
            Email:{" "}
            <a href="mailto:info@farmtotable.com" className="hover:text-yellow-300 transition-colors duration-300 ease-in-out underline">
              info@farmtotable.com
            </a>
          </p>
          <p className="text-lg font-medium">
            Phone:{" "}
            <a href="tel:1234567890" className="hover:text-yellow-300 transition-colors duration-300 ease-in-out underline">
              (123) 456-7890
            </a>
          </p>
        </div>

        {/* Social Media */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-2xl font-bold mb-4 text-yellow-300">Follow Us</h3>
          <div className="flex space-x-6 text-lg font-medium">
            <a href="#" className="hover:text-yellow-300 transition-colors duration-300 ease-in-out">Facebook</a>
            <a href="#" className="hover:text-yellow-300 transition-colors duration-300 ease-in-out">Twitter</a>
            <a href="#" className="hover:text-yellow-300 transition-colors duration-300 ease-in-out">Instagram</a>
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="container mx-auto mt-8 pt-6 border-t border-white/40 flex flex-col md:flex-row justify-between items-center px-6">
        <p className="text-center md:text-left text-sm font-light opacity-80">
          &copy; 2025 Farm to Table Marketplace. All rights reserved.
        </p>
        <Link to="/terms" className="hover:text-yellow-300 transition-colors duration-300 ease-in-out underline mt-4 md:mt-0 text-sm font-light opacity-80">
          Terms of Service
        </Link>
      </div>
    </footer>
  );
};
