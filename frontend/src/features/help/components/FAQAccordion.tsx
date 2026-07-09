import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

interface FAQAccordionProps {
  faqs: { _id: string; title: string; content: string; category: string }[];
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({ faqs }) => {
  const [openId, setOpenId] = React.useState<string | null>(null);

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="space-y-4">
      {faqs.map((faq) => (
        <div key={faq._id} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm">
          <button
            onClick={() => setOpenId(openId === faq._id ? null : faq._id)}
            className="w-full flex items-center justify-between p-5 text-left focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
          >
            <span className="font-bold text-gray-900 dark:text-white text-lg">{faq.title}</span>
            <div className="text-gray-500 shrink-0 ml-4">
              {openId === faq._id ? <FiChevronUp className="w-5 h-5" /> : <FiChevronDown className="w-5 h-5" />}
            </div>
          </button>
          <AnimatePresence>
            {openId === faq._id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="px-5 pb-5 text-gray-600 dark:text-gray-400 prose dark:prose-invert max-w-none"
              >
                <div dangerouslySetInnerHTML={{ __html: faq.content }} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};
