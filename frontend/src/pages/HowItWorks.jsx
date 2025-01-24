import React from "react";
import { Clipboard, Users, Truck } from "lucide-react";

const steps = [
  {
    icon: Clipboard,
    title: "List Products",
    description: "Easily add your farm products to our marketplace.",
  },
  {
    icon: Users,
    title: "Connect with Buyers",
    description: "Engage directly with consumers interested in your produce.",
  },
  {
    icon: Truck,
    title: "Deliver",
    description: "Coordinate delivery or pickup of fresh products.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-green-50 via-white to-green-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-green-700 animate-slide-up">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105 hover:shadow-2xl animate-fade-in"
            >
              <div className="flex items-center justify-center bg-green-200 text-green-700 rounded-full p-6 mb-6 w-20 h-20 animate-bounce">
                <step.icon size={48} />
              </div>
              <h3 className="text-xl font-semibold text-green-700 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
