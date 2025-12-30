import React from 'react';
import { motion } from 'framer-motion';

/**
 * Premium Card Component
 * Variants: default, glass, elevated, bordered
 */
const Card = ({
    children,
    variant = 'default',
    className = '',
    hover = true,
    ...props
}) => {
    const baseStyles = "rounded-2xl overflow-hidden transition-all duration-300";

    const variants = {
        default: "bg-white shadow-md",
        glass: "glass-effect shadow-glass",
        elevated: "bg-white shadow-premium",
        bordered: "bg-white border-2 border-gray-200",
    };

    const hoverStyles = hover ? "hover:shadow-premium-lg hover:-translate-y-2 transform" : "";

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`${baseStyles} ${variants[variant]} ${hoverStyles} ${className}`}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default Card;
