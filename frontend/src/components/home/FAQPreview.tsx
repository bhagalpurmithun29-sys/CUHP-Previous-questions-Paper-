import React from 'react';
import { motion } from 'framer-motion';

export const FAQPreview: React.FC = () => {
  const faqs = [
    {
      question: "Who can upload question papers?",
      answer: "Any registered student or faculty member of CUHP can upload papers. All uploads are reviewed by moderators before becoming public to ensure quality and authenticity."
    },
    {
      question: "Is this platform officially affiliated with CUHP?",
      answer: "This is a student-led initiative built for the CUHP community. While we work closely with faculty for moderation, it is maintained independently by students."
    },
    {
      question: "Are the papers free to download?",
      answer: "Yes! All resources on this platform are completely free for CUHP students. We believe in open access to academic resources."
    },
    {
      question: "How do I report a blurry or incorrect paper?",
      answer: "You can use the 'Report Flag' icon on any paper's detail page. Our moderators will review it and either replace it or request a re-upload."
    }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800/50 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
            Got questions? We've got answers.
          </p>
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
