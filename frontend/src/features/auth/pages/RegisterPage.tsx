import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { RegisterForm } from '../components/RegisterForm';

export const RegisterPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Left Panel: Branding & Value Proposition (Hidden on mobile) */}
      <div className="hidden md:flex md:w-1/2 lg:w-5/12 bg-blue-700 text-white p-12 flex-col justify-between overflow-hidden relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        
        <div className="relative z-10">
          <Link to="/" className="text-2xl font-bold tracking-tight">CUHP Question Bank</Link>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-24"
          >
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
              Empower your<br/>academic journey.
            </h1>
            <p className="text-blue-100 text-lg leading-relaxed max-w-md">
              Join thousands of CUHP students. Access thousands of previous year question papers instantly, verified and curated for your exact syllabus.
            </p>
          </motion.div>
        </div>

        <div className="relative z-10 flex items-center space-x-4">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-blue-700 bg-blue-300 flex items-center justify-center overflow-hidden">
                <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Student" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <p className="text-sm font-medium text-blue-200">Trusted by 5000+ students</p>
        </div>
      </div>

      {/* Right Panel: Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 lg:p-24 overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
        >
          {/* Mobile Logo */}
          <div className="md:hidden text-center mb-8">
            <Link to="/" className="text-2xl font-bold text-blue-700">CUHP QB</Link>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Create an account</h2>
            <p className="text-gray-500 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
                Log in here
              </Link>
            </p>
          </div>

          <RegisterForm />
          
        </motion.div>
      </div>
    </div>
  );
};
