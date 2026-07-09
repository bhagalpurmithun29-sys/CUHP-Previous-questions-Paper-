import React from 'react';
import { motion } from 'framer-motion';

export const FAQSection: React.FC = () => {
  const faqs = [
    {
      question: "Who can upload papers?",
      answer: "Any registered student or faculty member of CUHP can upload papers. All uploads are reviewed by moderators before becoming public to ensure quality and authenticity."
    },
    {
      question: "How are papers verified?",
      answer: "We have a dedicated team of student moderators and faculty advisors who cross-check the uploaded documents against syllabus records, course codes, and academic years to verify authenticity before they are approved for the public feed."
    },
    {
      question: "How do I report incorrect papers?",
      answer: "You can use the 'Report Flag' icon on any paper's detail page. Please select a reason (e.g., blurry scan, wrong semester, duplicate) and our moderators will address it promptly."
    }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800/50 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm"
            >
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {faq.question}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {faq.answer}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
