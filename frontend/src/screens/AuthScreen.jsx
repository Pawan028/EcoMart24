import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    FaUser,
    FaEnvelope,
    FaLock,
    FaEye,
    FaEyeSlash,
    FaCheckCircle,
    FaTimes,
    FaLeaf,
    FaArrowRight,
    FaAppleAlt,
    FaCarrot,
    FaLemon,
    FaSeedling,
} from 'react-icons/fa';
import { GiTomato, GiBroccoli, GiGrapes, GiBananaBunch, GiOrange, GiStrawberry } from 'react-icons/gi';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { useLoginMutation, useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';

const AuthScreen = () => {
    const location = useLocation();
    const initialIsSignUp = location.pathname === '/register';

    const [isSignUp, setIsSignUp] = useState(initialIsSignUp);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordStrength, setPasswordStrength] = useState({ score: 0, feedback: 'Weak' });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [login, { isLoading: loginLoading }] = useLoginMutation();
    const [register, { isLoading: registerLoading }] = useRegisterMutation();
    const { userInfo } = useSelector((state) => state.auth);
    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    useEffect(() => {
        if (userInfo) navigate(redirect);
    }, [navigate, redirect, userInfo]);

    const checkPasswordStrength = (pwd) => {
        let score = 0;
        if (pwd.length >= 8) score++;
        if (pwd.length >= 12) score++;
        if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) score++;
        if (/\d/.test(pwd)) score++;
        if (/[^a-zA-Z0-9]/.test(pwd)) score++;
        setPasswordStrength({ score, feedback: score <= 2 ? 'Weak' : score === 3 ? 'Fair' : score === 4 ? 'Good' : 'Strong' });
    };

    useEffect(() => { if (password) checkPasswordStrength(password); }, [password]);

    const passwordRequirements = [
        { check: password.length >= 8, label: '8+ chars' },
        { check: /[A-Z]/.test(password), label: 'Uppercase' },
        { check: /[a-z]/.test(password), label: 'Lowercase' },
        { check: /\d/.test(password), label: 'Number' },
    ];

    const getStrengthColor = () => ['bg-red-500', 'bg-red-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'][passwordStrength.score] || 'bg-red-500';

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!loginEmail || !loginPassword) return toast.error('Please fill in all fields');
        try {
            const res = await login({ email: loginEmail, password: loginPassword }).unwrap();
            dispatch(setCredentials(res));
            toast.success('Welcome back!');
            navigate(redirect);
        } catch (err) { toast.error(err?.data?.message || 'Invalid credentials'); }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        if (!name || !email || !password || !confirmPassword) return toast.error('Please fill in all fields');
        if (password.length < 8) return toast.error('Password must be at least 8 characters');
        if (password !== confirmPassword) return toast.error('Passwords do not match');
        try {
            const res = await register({ name, email, password }).unwrap();
            dispatch(setCredentials(res));
            toast.success('Account created!');
            navigate(redirect);
        } catch (err) { toast.error(err?.data?.message || 'Registration failed'); }
    };

    // Floating grocery icons
    const groceryItems = [
        { icon: FaAppleAlt, color: 'text-red-400', size: 28 },
        { icon: FaCarrot, color: 'text-orange-400', size: 26 },
        { icon: GiTomato, color: 'text-red-500', size: 32 },
        { icon: GiBroccoli, color: 'text-green-500', size: 30 },
        { icon: GiGrapes, color: 'text-purple-400', size: 28 },
        { icon: FaLemon, color: 'text-yellow-400', size: 24 },
        { icon: GiBananaBunch, color: 'text-yellow-300', size: 32 },
        { icon: GiOrange, color: 'text-orange-500', size: 26 },
        { icon: FaLeaf, color: 'text-green-400', size: 22 },
        { icon: GiStrawberry, color: 'text-red-400', size: 24 },
        { icon: FaSeedling, color: 'text-green-500', size: 20 },
    ];

    const FloatingGroceries = () => (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {groceryItems.map((item, i) => {
                const Icon = item.icon;
                return (
                    <motion.div
                        key={i}
                        className={`absolute ${item.color} opacity-20`}
                        style={{
                            left: `${(i * 9) % 100}%`,
                            top: `${(i * 11) % 100}%`,
                        }}
                        animate={{
                            y: [0, -30 - Math.random() * 20, 0],
                            x: [0, Math.random() * 20 - 10, 0],
                            rotate: [0, 15, -15, 0],
                            opacity: [0.15, 0.3, 0.15],
                        }}
                        transition={{
                            duration: 4 + Math.random() * 3,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: i * 0.4,
                        }}
                    >
                        <Icon size={item.size} />
                    </motion.div>
                );
            })}
        </div>
    );

    return (
        <div className="min-h-screen flex items-center justify-center p-4 overflow-hidden relative">
            {/* Fresh Grocery Background */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 25%, #bbf7d0 50%, #dcfce7 75%, #f0fdf4 100%)',
                    backgroundSize: '400% 400%',
                    animation: 'gradient-shift 15s ease infinite',
                }}
            />

            {/* Subtle pattern overlay */}
            <div
                className="absolute inset-0 opacity-30"
                style={{
                    backgroundImage: `radial-gradient(circle at 25% 25%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(22, 163, 74, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 50% 50%, rgba(74, 222, 128, 0.08) 0%, transparent 60%)`,
                }}
            />

            <FloatingGroceries />

            {/* Main Container */}
            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative w-full max-w-5xl min-h-[600px] rounded-3xl overflow-hidden shadow-2xl bg-white/90 backdrop-blur-xl border border-white/60"
            >
                <div className="flex flex-col md:flex-row min-h-[600px]">
                    {/* Forms Panel */}
                    <div className={`w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center ${isSignUp ? 'md:order-2' : 'md:order-1'}`}>
                        <AnimatePresence mode="wait">
                            {!isSignUp ? (
                                <motion.div key="login" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }}>
                                    <div className="flex items-center gap-3 mb-8">
                                        <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/30">
                                            <FaLeaf className="text-white text-2xl" />
                                        </div>
                                        <div>
                                            <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
                                            <p className="text-green-600 text-sm font-medium">Sign in to EcoMart</p>
                                        </div>
                                    </div>

                                    <form onSubmit={handleLogin} className="space-y-5">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                                            <div className="relative">
                                                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                                <input type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)}
                                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100 transition-all outline-none"
                                                    placeholder="you@example.com" required />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                                            <div className="relative">
                                                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                                <input type={showPassword ? 'text' : 'password'} value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)}
                                                    className="w-full pl-12 pr-12 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100 transition-all outline-none"
                                                    placeholder="••••••••" required />
                                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-500">
                                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                                </button>
                                            </div>
                                        </div>
                                        <motion.button type="submit" disabled={loginLoading} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                            className="w-full py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-xl shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                                            {loginLoading ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Sign In <FaArrowRight /></>}
                                        </motion.button>
                                    </form>
                                    <p className="mt-6 text-center text-gray-600">
                                        New here? <button onClick={() => setIsSignUp(true)} className="text-green-600 hover:text-green-700 font-semibold">Create Account</button>
                                    </p>
                                </motion.div>
                            ) : (
                                <motion.div key="signup" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="max-h-[520px] overflow-y-auto pr-2 custom-scrollbar">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/30">
                                            <FaLeaf className="text-white text-2xl" />
                                        </div>
                                        <div>
                                            <h1 className="text-3xl font-bold text-gray-800">Join EcoMart</h1>
                                            <p className="text-green-600 text-sm font-medium">Shop fresh & organic</p>
                                        </div>
                                    </div>

                                    <form onSubmit={handleSignup} className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                                            <div className="relative">
                                                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                                <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                                                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100 transition-all outline-none"
                                                    placeholder="John Doe" required />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                                            <div className="relative">
                                                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100 transition-all outline-none"
                                                    placeholder="you@example.com" required />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                                            <div className="relative">
                                                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                                <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)}
                                                    className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100 transition-all outline-none"
                                                    placeholder="Create password" required />
                                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-500">
                                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                                </button>
                                            </div>
                                            {password && (
                                                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mt-3">
                                                    <div className="flex justify-between text-xs mb-1">
                                                        <span className="text-gray-500 font-medium">Strength</span>
                                                        <span className={`font-semibold ${passwordStrength.score <= 2 ? 'text-red-500' : passwordStrength.score === 3 ? 'text-yellow-600' : 'text-green-600'}`}>
                                                            {passwordStrength.feedback}
                                                        </span>
                                                    </div>
                                                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                                        <motion.div initial={{ width: 0 }} animate={{ width: `${(passwordStrength.score / 5) * 100}%` }} className={`h-full rounded-full ${getStrengthColor()}`} />
                                                    </div>
                                                    <div className="flex flex-wrap gap-2 mt-2">
                                                        {passwordRequirements.map((req, i) => (
                                                            <span key={i} className={`text-xs px-2.5 py-1 rounded-full font-medium ${req.check ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                                                {req.check && <FaCheckCircle className="inline mr-1" />}{req.label}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
                                            <div className="relative">
                                                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                                <input type={showConfirmPassword ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                                                    className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100 transition-all outline-none"
                                                    placeholder="Confirm password" required />
                                                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-500">
                                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                                </button>
                                            </div>
                                            {confirmPassword && (
                                                <p className={`mt-1 text-xs font-medium flex items-center gap-1 ${password === confirmPassword ? 'text-green-600' : 'text-red-500'}`}>
                                                    {password === confirmPassword ? <><FaCheckCircle /> Match!</> : <><FaTimes /> No match</>}
                                                </p>
                                            )}
                                        </div>
                                        <motion.button type="submit" disabled={registerLoading} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                            className="w-full py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-xl shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                                            {registerLoading ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Create Account <FaArrowRight /></>}
                                        </motion.button>
                                    </form>
                                    <p className="mt-4 text-center text-gray-600 text-sm">
                                        Have an account? <button onClick={() => setIsSignUp(false)} className="text-green-600 hover:text-green-700 font-semibold">Sign In</button>
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Decorative Panel */}
                    <motion.div className={`hidden md:flex md:w-1/2 relative overflow-hidden ${isSignUp ? 'md:order-1' : 'md:order-2'}`}
                        style={{ background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 50%, #15803d 100%)' }}>

                        {/* Floating food icons on green panel */}
                        <div className="absolute inset-0 overflow-hidden">
                            {groceryItems.slice(0, 8).map((item, i) => {
                                const Icon = item.icon;
                                return (
                                    <motion.div key={i} className="absolute text-white/20"
                                        style={{ left: `${(i * 12) % 100}%`, top: `${(i * 15) % 100}%` }}
                                        animate={{ y: [0, -25, 0], rotate: [0, 10, -10, 0], opacity: [0.1, 0.25, 0.1] }}
                                        transition={{ duration: 5 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}>
                                        <Icon size={item.size + 10} />
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Content */}
                        <div className="relative z-10 flex flex-col items-center justify-center p-12 text-center">
                            <AnimatePresence mode="wait">
                                <motion.div key={isSignUp ? 'signin' : 'signup'} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                                    <motion.div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-8 mx-auto border border-white/30"
                                        animate={{ rotate: [0, 5, -5, 0], y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity }}>
                                        <FaLeaf className="text-white text-5xl" />
                                    </motion.div>
                                    <h2 className="text-4xl font-bold text-white mb-4">{isSignUp ? 'Welcome Back!' : 'Hello, Friend!'}</h2>
                                    <p className="text-white/90 mb-8 max-w-xs">
                                        {isSignUp ? 'Sign in to continue shopping fresh organic groceries.' : 'Join us and discover amazing organic products for a healthier life.'}
                                    </p>
                                    <motion.button onClick={() => setIsSignUp(!isSignUp)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                        className="px-8 py-3 bg-white text-green-600 font-bold rounded-xl hover:bg-gray-50 shadow-xl">
                                        {isSignUp ? 'Sign In' : 'Sign Up'}
                                    </motion.button>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default AuthScreen;
