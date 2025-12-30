import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * Scroll Progress Indicator
 * Shows a progress bar at the top of the page
 */
const ScrollProgress = () => {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-600 origin-left z-100 shadow-glow"
            style={{ scaleX: scrollProgress / 100 }}
            initial={{ scaleX: 0 }}
            transition={{ duration: 0.1 }}
        />
    );
};

export default ScrollProgress;
