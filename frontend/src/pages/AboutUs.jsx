import React from "react";
import about from "../assets/aboutus.jpg"

const AboutUs = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center animate-fade-in">
        {/* Image Section */}
        <div className="md:w-1/2 mb-8 md:mb-0 animate-slide-in-left">
          <img
            src={about}
            alt="Happy farmers"
            width={500}
            height={400}
            className="rounded-lg shadow-lg"
            priority
          />
        </div>

        {/* Text Section */}
        <div className="md:w-1/2 md:pl-12 text-center md:text-left animate-slide-in-right">
          <h2 className="text-4xl font-bold text-dark-green mb-6">About Us</h2>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            We're passionate about connecting local farmers with consumers who
            appreciate fresh, high-quality produce. Our platform makes it easy
            for farmers to showcase their products and for buyers to access the
            best local ingredients.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            By cutting out the middleman, we ensure that farmers receive fair
            prices for their hard work, while consumers enjoy the freshest
            produce at competitive rates. Join us in supporting sustainable
            agriculture and building stronger local food systems.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;

// Tailwind animations and classes used:
// - animate-fade-in: A custom fade-in animation (add it to your Tailwind config).
// - animate-slide-in-left: Slide-in animation from the left.
// - animate-slide-in-right: Slide-in animation from the right.
// Add the following in your Tailwind config file under the "extend" section to create custom animations:

// module.exports = {
//   theme: {
//     extend: {
//       animation: {
//         'fade-in': 'fadeIn 1s ease-in-out',
//         'slide-in-left': 'slideInLeft 1s ease-out',
//         'slide-in-right': 'slideInRight 1s ease-out',
//       },
//       keyframes: {
//         fadeIn: {
//           '0%': { opacity: '0' },
//           '100%': { opacity: '1' },
//         },
//         slideInLeft: {
//           '0%': { transform: 'translateX(-100%)', opacity: '0' },
//           '100%': { transform: 'translateX(0)', opacity: '1' },
//         },
//         slideInRight: {
//           '0%': { transform: 'translateX(100%)', opacity: '0' },
//           '100%': { transform: 'translateX(0)', opacity: '1' },
//         },
//       },
//     },
//   },
// }
