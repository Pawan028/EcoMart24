import React, { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Premium Input Component
 * With floating label and validation states
 */
const Input = ({
    label,
    type = 'text',
    error,
    success,
    icon,
    className = '',
    ...props
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = (e) => {
        setIsFocused(false);
        setHasValue(e.target.value !== '');
    };

    const getBorderColor = () => {
        if (error) return 'border-red-500 focus:border-red-500 focus:ring-red-500';
        if (success) return 'border-green-500 focus:border-green-500 focus:ring-green-500';
        return 'border-gray-300 focus:border-primary-500 focus:ring-primary-500';
    };

    return (
        <div className={`relative ${className}`}>
            {/* Icon */}
            {icon && (
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none z-10">
                    {icon}
                </div>
            )}

            {/* Input */}
            <input
                type={type}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={`
          w-full px-4 py-3 ${icon ? 'pl-12' : ''} 
          border-2 rounded-xl 
          transition-all duration-300
          focus:outline-none focus:ring-4 focus:ring-opacity-20
          ${getBorderColor()}
          ${error ? 'bg-red-50' : success ? 'bg-green-50' : 'bg-white'}
        `}
                {...props}
            />

            {/* Floating Label */}
            {label && (
                <motion.label
                    initial={false}
                    animate={{
                        top: isFocused || hasValue ? '-10px' : '50%',
                        fontSize: isFocused || hasValue ? '0.75rem' : '1rem',
                        y: isFocused || hasValue ? 0 : '-50%',
                    }}
                    className={`
            absolute ${icon ? 'left-12' : 'left-4'} 
            px-2 bg-white pointer-events-none
            transition-colors duration-300
            ${error ? 'text-red-500' : success ? 'text-green-500' : isFocused ? 'text-primary-500' : 'text-gray-500'}
          `}
                >
                    {label}
                </motion.label>
            )}

            {/* Error/Success Message */}
            {error && (
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-sm text-red-600 flex items-center gap-1"
                >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {error}
                </motion.p>
            )}
            {success && (
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-sm text-green-600 flex items-center gap-1"
                >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {success}
                </motion.p>
            )}
        </div>
    );
};

export default Input;
