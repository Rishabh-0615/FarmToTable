import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import farmerImg from "../assets/logo.png";
import consumerImg from "../assets/image.png";
import vegetablesImg from "../assets/about.png";

const HeroSection = () => {
  const farmerControls = useAnimation();
  const consumerControls = useAnimation();
  const vegetableControls = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      // Farmer enters
      await farmerControls.start({ x: "50%", transition: { duration: 2 } });
      // Consumer enters simultaneously
      await consumerControls.start({ x: "-50%", transition: { duration: 2 } });

      // Vegetables move to the consumer
      await vegetableControls.start({
        scale: 1.2,
        y: -20,
        transition: { duration: 1 },
      });

      // Both exit the screen
      await farmerControls.start({ x: "-150%", transition: { duration: 2 } });
      await consumerControls.start({ x: "150%", transition: { duration: 2 } });
    };

    sequence();
  }, [farmerControls, consumerControls, vegetableControls]);

  return (
    <div className="relative w-full h-[90vh] bg-green-100 flex items-center justify-center overflow-hidden">
      {/* Farmer */}
      <motion.div
        animate={farmerControls}
        initial={{ x: "-100%" }}
        className="absolute left-0 bottom-10 w-32"
      >
        <img src={farmerImg} alt="Farmer" className="w-full" />
      </motion.div>

      {/* Vegetables */}
      <motion.div
        animate={vegetableControls}
        initial={{ scale: 1 }}
        className="absolute w-16 z-10"
      >
        <img src={vegetablesImg} alt="Vegetables" className="w-full" />
      </motion.div>

      {/* Consumer */}
      <motion.div
        animate={consumerControls}
        initial={{ x: "100%" }}
        className="absolute right-0 bottom-10 w-32"
      >
        <img src={consumerImg} alt="Consumer" className="w-full" />
      </motion.div>
    </div>
  );
};

export default HeroSection;
