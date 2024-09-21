import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../assets/styles/SplashScreen.css'; // Import your CSS file

const fruits = [
  '🍎', '🍌', '🍇', '🍊', '🥕', '🥦', '🍅', '🥑',
  '🍉', '🍒', '🍍', '🍋', '🍓', '🥥', '🍈', '🍑',
  '🥭', '🥒', '🌽', '🥔', '🥕', '🍆', '🥭', '🍐'
];

const SplashScreen = () => {
  const [bgColor, setBgColor] = useState('#4CAF50');

  // Change background color every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setBgColor(`hsl(${Math.random() * 360}, 70%, 80%)`);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden" style={{ backgroundColor: bgColor, transition: 'background-color 2s' }}>
      {/* Background overlay */}
      <div className="splash absolute inset-0" />

      <div id="welcome" className="flex flex-col items-center justify-center relative z-10 px-4">
        {/* Logo Animation */}
        <motion.div 
          className="logo-container mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ type: "spring", stiffness: 100, damping: 10, duration: 1 }}
        >
          <div className="logo"></div>
        </motion.div>

        {/* Welcome Message */}
        <motion.h1 
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Welcome to EcoMart
        </motion.h1>

        <motion.p 
          className="mt-4 text-base sm:text-lg md:text-xl text-white text-center max-w-md"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Your one-stop shop for fresh, quality groceries delivered right to your doorstep.
        </motion.p>
      </div>

      {/* Fruit Animation */}
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-3xl sm:text-4xl md:text-5xl"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * -window.innerHeight // Start randomly above the viewport
          }}
          animate={{
            y: window.innerHeight + 100, // End below the viewport
            rotate: 360
          }}
          transition={{
            duration: Math.random() * 10 + 15, // Random duration for variety
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ left: Math.random() * 100 + '%' }} // Random horizontal position
        >
          {fruits[Math.floor(Math.random() * fruits.length)]} {/* Random fruit */}
        </motion.div>
      ))}
    </div>
  );
};

export default SplashScreen;
