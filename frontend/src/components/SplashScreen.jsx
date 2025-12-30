import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLeaf } from 'react-icons/fa';
import '../assets/styles/SplashScreen.css';

const fruits = [
  '🍎', '🍌', '🍇', '🍊', '🥕', '🥦', '🍅', '🥑',
  '🍉', '🍒', '🍍', '🍋', '🍓', '🥥', '🍈', '🍑',
  '🥭', '🥒', '🌽', '🥔', '🥕', '🍆', '🥭', '🍐'
];

const SplashScreen = () => {
  const [progress, setProgress] = useState(0);
  const [bgColor, setBgColor] = useState('#22c55e');

  // Progress animation
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 60);

    return () => clearInterval(progressInterval);
  }, []);

  // Background color animation
  useEffect(() => {
    const colorInterval = setInterval(() => {
      const colors = ['#22c55e', '#10b981', '#14b8a6', '#059669'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      setBgColor(randomColor);
    }, 3000);

    return () => clearInterval(colorInterval);
  }, []);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center overflow-hidden z-50"
      style={{
        background: `linear-gradient(135deg, ${bgColor} 0%, #065f46 100%)`,
        transition: 'background 2s ease-in-out'
      }}
    >
      {/* Animated geometric shapes background */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="flex flex-col items-center justify-center relative z-10 px-4 max-w-2xl w-full">
        {/* Logo with 3D Animation */}
        <motion.div
          initial={{ scale: 0, rotateY: 0 }}
          animate={{
            scale: [0, 1.2, 1],
            rotateY: [0, 360, 0],
          }}
          transition={{
            duration: 1.5,
            times: [0, 0.6, 1],
            ease: 'easeOut'
          }}
          className="mb-8"
        >
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-white/30 rounded-full blur-3xl animate-pulse" />

            {/* Logo container */}
            <motion.div
              className="relative bg-white rounded-full p-8 shadow-2xl"
              animate={{
                boxShadow: [
                  '0 0 40px rgba(255,255,255,0.5)',
                  '0 0 80px rgba(255,255,255,0.8)',
                  '0 0 40px rgba(255,255,255,0.5)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <FaLeaf className="text-6xl md:text-8xl text-green-600" />
            </motion.div>
          </div>
        </motion.div>

        {/* Welcome Message */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 font-display">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="inline-block"
            >
              Welcome to
            </motion.span>{' '}
            <motion.span
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
              className="inline-block gradient-text"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #a7f3d0 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              EcoMart
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="text-lg sm:text-xl md:text-2xl text-green-50 max-w-xl mx-auto"
          >
            Your one-stop shop for fresh, quality groceries delivered right to your doorstep
          </motion.p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.3 }}
          className="w-full max-w-md mt-12"
        >
          <div className="relative">
            {/* Background bar */}
            <div className="h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
              {/* Progress bar */}
              <motion.div
                className="h-full bg-gradient-to-r from-white to-green-100 rounded-full relative overflow-hidden"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
              </motion.div>
            </div>

            {/* Progress percentage */}
            <motion.p
              className="text-center text-white text-sm font-semibold mt-3"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Loading... {Math.round(progress)}%
            </motion.p>
          </div>
        </motion.div>
      </div>

      {/* Floating Fruits with stagger animation */}
      <AnimatePresence>
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl sm:text-4xl md:text-5xl pointer-events-none"
            initial={{
              x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0,
              y: typeof window !== 'undefined' ? -100 : 0,
              opacity: 0.6,
              rotate: 0,
            }}
            animate={{
              y: typeof window !== 'undefined' ? window.innerHeight + 100 : 1000,
              rotate: 360,
              opacity: [0.6, 0.8, 0.6],
            }}
            transition={{
              duration: Math.random() * 8 + 12,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 0.1,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))',
            }}
          >
            {fruits[Math.floor(Math.random() * fruits.length)]}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default SplashScreen;
