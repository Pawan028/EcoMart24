import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { toast } from 'react-toastify';
import { useLoginMutation, useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';

/* ============================================
   ECO-MART AUTH SCREEN: "LIVING BLOBS" ULTIMATE EDITION
   Features:
   - Centered alignment for 100% visibility
   - Smooth "Layout" animations
   - Deep interactivity: Reaction to EVERY action
============================================ */

const AuthScreen = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Auth State
    const [isSignUp, setIsSignUp] = useState(location.pathname === '/register');
    const [focusedField, setFocusedField] = useState(null); // 'name', 'email', 'password', 'confirm'

    // Form Inputs
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [showPassword, setShowPassword] = useState(false);

    // Mouse Tracking (Framer Motion - High Performance)
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth springs for eye movement
    const springConfig = { damping: 25, stiffness: 150 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    const containerRef = useRef(null);

    // API Hooks
    const [login, { isLoading: loginLoading }] = useLoginMutation();
    const [register, { isLoading: registerLoading }] = useRegisterMutation();
    const { userInfo } = useSelector((state) => state.auth);

    const searchParams = new URLSearchParams(location.search);
    const redirect = searchParams.get('redirect') || '/';

    useEffect(() => {
        if (userInfo) navigate(redirect);
    }, [userInfo, navigate, redirect]);

    // High Perforamnce Mouse Handler
    useEffect(() => {
        const handleMouseMove = (e) => {
            const { innerWidth, innerHeight } = window;
            // Normalize to -1 to 1
            mouseX.set((e.clientX / innerWidth) * 2 - 1);
            mouseY.set((e.clientY / innerHeight) * 2 - 1);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    // ACTION HANDLERS FOR REACTIONS
    const handleFocus = (field) => setFocusedField(field);
    const handleBlur = () => setFocusedField(null);
    const toggleMode = () => {
        setIsSignUp(!isSignUp);
        setFocusedField(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFocusedField('submitting'); // Trigger submission reaction
        try {
            if (isSignUp) {
                if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
                    setFocusedField('error');
                    return toast.error("Please fill all fields");
                }
                const res = await register({ ...formData }).unwrap();
                dispatch(setCredentials(res));
            } else {
                if (!formData.email || !formData.password) {
                    setFocusedField('error');
                    return toast.error("Please fill all fields");
                }
                const res = await login({ email: formData.email, password: formData.password }).unwrap();
                dispatch(setCredentials(res));
            }
            navigate(redirect);
        } catch (err) {
            setFocusedField('error');
            toast.error(err?.data?.message || "Authentication failed");
        }
    };

    /* ----------------------------------------------------
       REACTION LOGIC
    ---------------------------------------------------- */
    const isPasswordField = focusedField === 'password' || focusedField === 'confirm';
    const isError = focusedField === 'error';
    const isSubmit = focusedField === 'submitting';
    const isNormalInput = ['name', 'email'].includes(focusedField);

    // Any interaction state where we want them to focus on the form
    const isFocusedOnForm = isNormalInput;

    // Shared Eye Component
    const Eye = ({ cx, cy, rx, ry, pupilSize, eyeColor = "white", isNaughty = false }) => {
        // Map spring values to pixel offsets - constrained to stay inside eyeball
        const maxMove = Math.min(rx, ry) - pupilSize - 1; // Keep pupil inside with 1px margin
        const eyeX = useTransform(springX, [-1, 1], [-maxMove * 0.85, maxMove * 0.85]);
        const eyeY = useTransform(springY, [-1, 1], [-maxMove * 0.75, maxMove * 0.75]);

        // Manual offsets logic - also constrained
        let animateState = {};
        const constrainedX = maxMove * 0.8;
        const constrainedY = maxMove * 0.7;

        // BASE LOGIC:
        // 1. If Password Field Focused:
        //    - Standard Blobs: Look LEFT (Away)
        //    - Naughty Blob: Look RIGHT (Peek)
        // 2. If Normal Input Focused:
        //    - Everyone: Look RIGHT (At Form)

        if (isPasswordField) {
            if (isNaughty) {
                // Naughty One Peeks!
                animateState = { x: constrainedX, y: constrainedY * 0.5 };
            } else {
                // Others Look Away!
                animateState = { x: -constrainedX, y: constrainedY * 0.5 };
            }
        } else if (isFocusedOnForm) {
            // Everyone looks at Name/Email
            animateState = { x: constrainedX, y: constrainedY * 0.5 };
        } else if (isError) {
            animateState = { y: constrainedY, x: 0 };
        } else if (isSubmit) {
            animateState = { y: -constrainedY, x: 0 };
        }

        // We use 'animate' for the overrides to ensure they take precedence over the style motion value
        // If animateState is empty, we fall back to the style prop (mouse tracking)
        const isOverridden = Object.keys(animateState).length > 0;

        return (
            <g>
                <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={eyeColor} />
                <motion.circle
                    cx={cx} cy={cy} r={pupilSize} fill="#1a1a2e"
                    style={!isOverridden ? { x: eyeX, y: eyeY } : {}}
                    animate={animateState}
                    transition={{ type: "spring", stiffness: 150, damping: 18 }}
                />
            </g>
        );
    };

    /* ----------------------------------------------------
       CHARACTERS (THE BLOB SQUAD - 9 UNIQUE SHAPES)
    ---------------------------------------------------- */

    // 1. LARGE ORANGE DOME - Main character (front left, overlapping others)
    const OrangeChar = () => (
        <motion.div className="absolute" style={{ bottom: '0%', left: '0px', width: 260, zIndex: 30 }}>
            <svg viewBox="0 0 260 180" className="drop-shadow-xl">
                {/* Large dome/semicircle shape */}
                <ellipse cx="130" cy="180" rx="130" ry="130" fill="#FF8C00" />
                {/* Eyes - positioned more to the left like reference */}
                <Eye cx={75} cy={110} rx={22} ry={26} pupilSize={10} />
                <Eye cx={135} cy={115} rx={22} ry={26} pupilSize={10} />
                {/* Cute smile */}
                <motion.path
                    d={isError ? "M80,145 Q110,125 140,145" : isPasswordField ? "M95,140 Q110,145 125,140" : "M80,140 Q110,160 140,140"}
                    stroke="#1a1a2e" strokeWidth="5" fill="none" strokeLinecap="round"
                    animate={{ d: isError ? "M80,145 Q110,125 140,145" : isPasswordField ? "M95,140 Q110,145 125,140" : "M80,140 Q110,160 140,140" }}
                />
            </svg>
        </motion.div>
    );

    // 2. TALL PURPLE RECTANGLE - Very tall, behind orange (like reference)
    const PurpleChar = () => (
        <motion.div className="absolute" style={{ bottom: '0%', left: '50px', width: 110, zIndex: 15 }}>
            <svg viewBox="0 0 110 320" className="drop-shadow-2xl">
                {/* Tall rectangle with slightly rounded top - almost flat like reference */}
                <path d="M5,320 L5,20 Q5,5 15,5 L95,5 Q105,5 105,20 L105,320 Z" fill="#8B5CF6" />
                {/* Eyes positioned higher up */}
                <Eye cx={38} cy={75} rx={14} ry={16} pupilSize={6} />
                <Eye cx={72} cy={75} rx={14} ry={16} pupilSize={6} />
                {/* Simple straight/curved mouth */}
                <path d="M38,120 L72,120" stroke="#1a1a2e" strokeWidth="3" strokeLinecap="round" />
            </svg>
        </motion.div>
    );

    // 3. BLACK ROUNDED PILLAR - Wider and positioned closer to purple (NAUGHTY - peeks at password!)
    const BlackChar = () => (
        <motion.div className="absolute" style={{ bottom: '0%', left: '130px', width: 95, zIndex: 18 }}>
            <svg viewBox="0 0 95 220" className="drop-shadow-2xl">
                {/* Rounded pillar shape - wider and taller */}
                <path d="M5,220 L5,50 Q5,10 47.5,10 Q90,10 90,50 L90,220 Z" fill="#1F2937" />
                {/* Big googly eyes - using cream for visibility, repositioned for wider blob */}
                <Eye cx={32} cy={70} rx={14} ry={14} pupilSize={6} eyeColor="#F5F5DC" isNaughty={true} />
                <Eye cx={63} cy={70} rx={14} ry={14} pupilSize={6} eyeColor="#F5F5DC" isNaughty={true} />
                {/* Simple line mouth - repositioned */}
                <path d="M30,115 L65,115" stroke="#6B7280" strokeWidth="3" strokeLinecap="round" />
            </svg>
        </motion.div>
    );

    // 4. YELLOW DOME - Right side character, taller and positioned closer to black blob
    const YellowChar = () => (
        <motion.div className="absolute" style={{ bottom: '0%', left: '195px', width: 140, zIndex: 22 }}>
            <svg viewBox="0 0 140 160" className="drop-shadow-2xl">
                {/* Taller dome/half-circle shape - increased height but still less than purple */}
                <path d="M5,160 L5,70 Q5,5 70,5 Q135,5 135,70 L135,160 Z" fill="#FBBF24" />
                {/* Two eyes - repositioned for taller blob */}
                <Eye cx={48} cy={60} rx={12} ry={14} pupilSize={5} />
                <Eye cx={92} cy={60} rx={12} ry={14} pupilSize={5} />
                {/* Cute smile - repositioned for taller blob */}
                <path d="M55,100 Q70,115 85,100" stroke="#1a1a2e" strokeWidth="3" fill="none" strokeLinecap="round" />
            </svg>
        </motion.div>
    );

    return (
        <div ref={containerRef} className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-lime-50 overflow-hidden relative">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600&display=swap');
                * { font-family: 'Fredoka', sans-serif; }
            `}</style>

            {/* BACKGROUND DECORATIONS - Fresh Green Theme */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-20 -left-20 w-[600px] h-[600px] bg-green-200 rounded-full blur-[120px] opacity-50" />
                <div className="absolute -bottom-20 -right-20 w-[600px] h-[600px] bg-emerald-200 rounded-full blur-[120px] opacity-50" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-lime-100 rounded-full blur-[100px] opacity-30" />
            </div>

            {/* MAIN CONTENT WRAPPER */}
            <div className="relative w-full max-w-7xl min-h-screen md:h-[90vh] flex flex-col md:flex-row items-center justify-center px-4 py-6 md:p-4 gap-2 md:gap-8">

                {/* 1. CHARACTER STAGE - Hidden on mobile, visible on md+ screens */}
                <motion.div
                    initial={false}
                    animate={isSignUp ? { scale: 0.9, x: -20 } : { scale: 1, x: 0 }}
                    transition={{ type: "spring", stiffness: 100 }}
                    className="hidden md:flex relative w-full md:w-1/2 md:h-full items-center justify-center order-1"
                >
                    <div className="relative w-[260px] sm:w-[320px] md:w-[380px] h-[180px] sm:h-[260px] md:h-[340px] flex items-end justify-center scale-[0.6] sm:scale-[0.75] md:scale-100 origin-bottom">
                        {/* BACK ROW */}
                        <PurpleChar />

                        {/* MID ROW */}
                        <BlackChar />
                        <YellowChar />

                        {/* FRONT ROW */}
                        <OrangeChar />
                    </div>
                </motion.div>

                {/* 2. AUTH FORM CARD - Mobile optimized */}
                <motion.div
                    layout
                    className="relative w-full max-w-[95%] sm:max-w-[400px] md:w-[450px] bg-white/90 md:bg-white/80 backdrop-blur-xl rounded-2xl md:rounded-3xl shadow-2xl p-5 sm:p-6 md:p-8 border border-white/50 order-2 md:order-2 z-10"
                >
                    {/* Tabs */}
                    <div className="flex bg-gray-100/50 p-1 sm:p-1.5 rounded-xl md:rounded-2xl mb-4 sm:mb-6">
                        <button onClick={toggleMode} className={`flex-1 py-2 sm:py-2.5 rounded-lg md:rounded-xl text-xs sm:text-sm font-bold transition-all ${!isSignUp ? 'bg-white shadow-sm text-[#1a1a2e]' : 'text-gray-400'}`}>Log In</button>
                        <button onClick={toggleMode} className={`flex-1 py-2 sm:py-2.5 rounded-lg md:rounded-xl text-xs sm:text-sm font-bold transition-all ${isSignUp ? 'bg-white shadow-sm text-[#1a1a2e]' : 'text-gray-400'}`}>Sign Up</button>
                    </div>

                    <div className="mb-4 sm:mb-6 text-center">
                        <h2 className="text-xl sm:text-2xl font-bold text-[#1a1a2e]">{isSignUp ? '🌱 Join EcoMart Family!' : '🛒 Welcome Back, Shopper!'}</h2>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1">{isSignUp ? 'Start your fresh grocery journey today' : 'Fresh deals are waiting for you!'}</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                        <AnimatePresence mode="wait">
                            {isSignUp && (
                                <motion.div key="name" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                                    <input type="text" name="name" placeholder="Full Name" className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-gray-50 border-2 border-transparent focus:border-green-500 outline-none transition-all text-sm sm:text-base"
                                        value={formData.name} onChange={handleChange} onFocus={() => handleFocus('name')} onBlur={handleBlur} />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <input type="email" name="email" placeholder="Email Address" className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-gray-50 border-2 border-transparent focus:border-green-500 outline-none transition-all text-sm sm:text-base"
                            value={formData.email} onChange={handleChange} onFocus={() => handleFocus('email')} onBlur={handleBlur} />

                        <div className="relative">
                            <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-gray-50 border-2 border-transparent focus:border-green-500 outline-none transition-all text-sm sm:text-base"
                                value={formData.password} onChange={handleChange} onFocus={() => handleFocus('password')} onBlur={handleBlur} />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-600 p-1">
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>

                        <AnimatePresence mode="wait">
                            {isSignUp && (
                                <motion.div key="confirm" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                                    <input type="password" name="confirmPassword" placeholder="Confirm Password" className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-gray-50 border-2 border-transparent focus:border-green-500 outline-none transition-all text-sm sm:text-base"
                                        value={formData.confirmPassword} onChange={handleChange} onFocus={() => handleFocus('confirm')} onBlur={handleBlur} />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <motion.button
                            type="submit" disabled={loginLoading || registerLoading}
                            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                            className="w-full py-3 sm:py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg sm:rounded-xl font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all"
                        >
                            {loginLoading || registerLoading ? '🥬 Loading...' : (isSignUp ? '🌿 Start Shopping' : '🛍️ Sign In')}
                        </motion.button>
                    </form>

                    <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-100">
                        <button className="w-full flex items-center justify-center gap-2 py-2.5 sm:py-3 border-2 border-gray-100 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base hover:bg-gray-50 transition-colors">
                            <FaGoogle className="text-red-500" /> Continue with Google
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AuthScreen;
