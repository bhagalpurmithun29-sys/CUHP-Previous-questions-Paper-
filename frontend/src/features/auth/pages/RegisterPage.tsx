import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { RegisterForm } from '../components/RegisterForm';
import { SocialLoginButtons } from '../components/SocialLoginButtons';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

export const RegisterPage: React.FC = () => {
  React.useEffect(() => {
    document.title = 'Create Account - CUHP Question Bank';
  }, []);

  const benefits = [
    'Access 10,000+ Previous Year Papers',
    'Personalized Study Planner',
    'Smart Revision Insights',
    'AI-Powered Academic Search',
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative overflow-hidden bg-gray-50 dark:bg-gray-950 transition-colors duration-500 selection:bg-primary/30 selection:text-primary">
      {/* Animated Background Gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex justify-center items-center">
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-primary/20 dark:bg-primary/10 blur-[120px] mix-blend-multiply dark:mix-blend-lighten"
        />
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-blue-400/20 dark:bg-blue-600/10 blur-[100px] mix-blend-multiply dark:mix-blend-lighten"
        />
      </div>

      {/* Left Panel: Branding & Value Proposition */}
      <div className="hidden md:flex md:w-1/2 lg:w-5/12 p-12 flex-col justify-between relative z-10 border-r border-gray-200/50 dark:border-gray-800/50 bg-white/30 dark:bg-gray-900/30 backdrop-blur-3xl">
        <div className="relative z-10">
          <Link to="/" className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white text-lg font-bold">C</div>
            CUHP QB
          </Link>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            className="mt-24"
          >
            <h1 className="text-5xl lg:text-6xl font-display font-bold leading-tight mb-6 text-gray-900 dark:text-white">
              Empower your<br/><span className="text-primary">academic journey.</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed max-w-md mb-10">
              Join thousands of CUHP students. Access thousands of previous year question papers instantly, verified and curated for your exact syllabus.
            </p>

            <ul className="space-y-4">
              {benefits.map((benefit, idx) => (
                <motion.li 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + (idx * 0.1), duration: 0.4 }}
                  className="flex items-center text-gray-700 dark:text-gray-300 gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center">
                    <CheckCircleIcon className="w-4 h-4 text-success" />
                  </div>
                  <span className="font-medium text-sm">{benefit}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="relative z-10 flex items-center space-x-4 mt-20 pt-8 border-t border-gray-200/50 dark:border-gray-800/50">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-900 bg-gray-200 flex items-center justify-center overflow-hidden shadow-sm">
                <img src={`https://i.pravatar.cc/100?img=\${i+10}`} alt="Student Avatar" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900 dark:text-white">Trusted by 5000+ students</p>
            <div className="flex text-warning text-xs mt-0.5">
              {'★★★★★'}
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel: Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 lg:p-24 overflow-y-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          className="w-full max-w-xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-3xl shadow-2xl p-8 sm:p-10 border border-white/20 dark:border-gray-800/50"
        >
          {/* Mobile Logo */}
          <header className="md:hidden text-center mb-8 flex justify-center">
            <Link to="/" className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white text-lg font-bold">C</div>
              CUHP QB
            </Link>
          </header>

          <div className="mb-8 text-center md:text-left">
            <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-2">Create an account</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-primary hover:text-primary/80 transition-colors">
                Log in here
              </Link>
            </p>
          </div>

          <RegisterForm />
          
          <SocialLoginButtons />

        </motion.div>
      </div>
    </div>
  );
};
