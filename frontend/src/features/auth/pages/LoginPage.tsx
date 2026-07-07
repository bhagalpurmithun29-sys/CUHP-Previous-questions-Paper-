import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
// import { LoginForm } from '../components/LoginForm'; // Assuming this exists or will be generated
// import { Logo } from '../../../components/Logo'; // Placeholder

export const LoginPage: React.FC = () => {
  React.useEffect(() => {
    document.title = 'Log In - CUHP Question Bank';
  }, []);

  const featureHighlights = [
    'Search Previous Year Papers',
    'Download Papers',
    'Upload Papers',
    'Bookmarks',
    'Verified Content',
    'Fast Search'
  ];

  return (
    <main className="min-h-screen flex flex-col md:flex-row bg-gray-50 overflow-hidden selection:bg-blue-100 selection:text-blue-900">
      <section 
        className="hidden md:flex md:w-1/2 lg:w-5/12 bg-blue-700 text-white p-12 flex-col justify-between relative"
        aria-label="Branding and Features"
      >
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none" 
          style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '24px 24px' }}
          aria-hidden="true"
        />
        
        <header className="relative z-10">
          <Link to="/" className="text-2xl font-bold tracking-tight hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-white rounded">
            CUHP Question Bank
          </Link>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-20"
          >
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
              Welcome back to<br/>academic excellence.
            </h1>
            <p className="text-blue-100 text-lg leading-relaxed max-w-md mb-10">
              The Digital Repository of Previous Year Question Papers for Central University of Himachal Pradesh.
            </p>

            <ul className="space-y-4" aria-label="Feature highlights">
              {featureHighlights.map((feature, idx) => (
                <motion.li 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + (idx * 0.1), duration: 0.4 }}
                  className="flex items-center text-blue-50"
                >
                  <svg className="w-5 h-5 mr-3 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-medium text-sm tracking-wide">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </header>

        <footer className="relative z-10 mt-12 text-sm text-blue-200/80 font-medium tracking-wide">
          <p>&copy; {new Date().getFullYear()} CUHP Question Bank.</p>
        </footer>
      </section>

      <section 
        className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 lg:p-24 overflow-y-auto"
        aria-label="Authentication Form"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-8 sm:p-10 border border-gray-100/80"
        >
          <header className="md:hidden text-center mb-8">
            <Link to="/" className="text-2xl font-bold text-blue-700 tracking-tight">CUHP QB</Link>
          </header>

          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 tracking-tight">Log in</h2>
            <p className="text-gray-500 text-sm">
              Don't have an account?{' '}
              <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">
                Register here
              </Link>
            </p>
          </div>

          <div className="min-h-[250px] flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg bg-gray-50 mb-6">
            <p className="text-gray-400 text-sm font-medium">LoginForm Placeholder</p>
            {/* <LoginForm /> */}
          </div>

          <div className="text-center">
            <Link 
              to="/forgot-password" 
              className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            >
              Forgot your password?
            </Link>
          </div>
        </motion.div>

        <footer className="w-full max-w-md mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-medium text-gray-400" aria-label="Auxiliary links">
          <a href="/privacy" className="hover:text-gray-600 transition-colors">Privacy Policy</a>
          <a href="/terms" className="hover:text-gray-600 transition-colors">Terms</a>
          <a href="/help" className="hover:text-gray-600 transition-colors">Help</a>
          <a href="/contact" className="hover:text-gray-600 transition-colors">Contact</a>
          <span className="text-gray-300">|</span>
          <span>v1.0.0</span>
        </footer>
      </section>
    </main>
  );
};
