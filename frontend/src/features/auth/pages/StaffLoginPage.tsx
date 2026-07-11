import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LoginForm } from '../components/LoginForm';

export const StaffLoginPage: React.FC = () => {
  React.useEffect(() => {
    document.title = 'Staff Portal Log In - CUHP Question Bank';
  }, []);

  return (
    <main className="min-h-screen flex flex-col md:flex-row relative overflow-hidden bg-gray-50 dark:bg-gray-950 transition-colors duration-500 selection:bg-primary/30 selection:text-primary">
      {/* Animated Background Gradients for Staff Portal */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex justify-center items-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-primary/10 dark:bg-primary/5 blur-[120px] mix-blend-multiply dark:mix-blend-lighten"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-indigo-400/10 dark:bg-indigo-600/10 blur-[100px] mix-blend-multiply dark:mix-blend-lighten"
        />
      </div>

      <section className="hidden md:flex md:w-1/2 lg:w-5/12 p-12 flex-col justify-between relative z-10 border-r border-gray-200/50 dark:border-gray-800/50 bg-white/30 dark:bg-gray-950/30 backdrop-blur-sm">
        <header>
          <Link to="/" className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white text-lg font-bold">C</div>
            CUHP QB Staff Portal
          </Link>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className="mt-20"
          >
            <h1 className="text-4xl lg:text-5xl font-display font-bold leading-tight mb-6 text-gray-900 dark:text-white">
              System Administration <br/><span className="text-primary">& Moderation Hub</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed max-w-md">
              Secure access portal for CUHP Question Bank administrators, moderators, and faculty staff.
            </p>
            
            <div className="mt-12 space-y-4">
              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                  <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                Enterprise-grade security & audit logging
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                  <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                Role-Based Access Control (RBAC)
              </div>
            </div>
          </motion.div>
        </header>

        <footer className="text-sm text-gray-500 font-medium">
          <p>&copy; {new Date().getFullYear()} CUHP. Restricted Access.</p>
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
              CUHP Staff
            </Link>
          </header>

          <div className="mb-8 text-center md:text-left">
            <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-2">Staff Login</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Please enter your administrative credentials.
            </p>
          </div>

          <LoginForm />

        </motion.div>
      </section>
    </main>
  );
};
