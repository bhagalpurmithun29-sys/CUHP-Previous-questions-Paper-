import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LoginForm } from '../components/LoginForm';
import { SocialLoginButtons } from '../components/SocialLoginButtons';

export const LoginPage: React.FC = () => {
  React.useEffect(() => {
    document.title = 'Log In - CUHP Question Bank';
  }, []);

  return (
    <main className="min-h-screen flex flex-col md:flex-row relative overflow-hidden bg-gray-50 dark:bg-gray-950 transition-colors duration-500 selection:bg-primary/30 selection:text-primary">
      {/* Animated Background Gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex justify-center items-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-primary/20 dark:bg-primary/10 blur-[120px] mix-blend-multiply dark:mix-blend-lighten"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-blue-400/20 dark:bg-blue-600/10 blur-[100px] mix-blend-multiply dark:mix-blend-lighten"
        />
      </div>

      <section className="hidden md:flex md:w-1/2 lg:w-5/12 p-12 flex-col justify-between relative z-10">
        <header>
          <Link to="/" className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white text-lg font-bold">C</div>
            CUHP QB
          </Link>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className="mt-20"
          >
            <h1 className="text-5xl lg:text-6xl font-display font-bold leading-tight mb-6 text-gray-900 dark:text-white">
              Welcome back to<br/><span className="text-primary">academic excellence.</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed max-w-md">
              The Digital Repository of Previous Year Question Papers for Central University of Himachal Pradesh.
            </p>
          </motion.div>
        </header>

        <footer className="text-sm text-gray-500 dark:text-gray-500 font-medium">
          <p>&copy; {new Date().getFullYear()} CUHP Question Bank.</p>
        </footer>
      </section>

      <section className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 lg:p-24 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-md bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-3xl shadow-2xl p-8 sm:p-10 border border-white/20 dark:border-gray-800/50"
        >
          <header className="md:hidden text-center mb-8 flex justify-center">
            <Link to="/" className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white text-lg font-bold">C</div>
              CUHP QB
            </Link>
          </header>

          <div className="mb-8 text-center md:text-left">
            <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-2">Log in</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Don't have an account?{' '}
              <Link to="/register" className="font-semibold text-primary hover:text-primary/80 transition-colors">
                Register here
              </Link>
            </p>
          </div>

          <LoginForm />

          <SocialLoginButtons />

        </motion.div>
      </section>
    </main>
  );
};
