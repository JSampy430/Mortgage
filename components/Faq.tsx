'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'How can expats apply for a mortgage in Dubai?',
    answer:
      'To get a mortgage as an expat in Dubai, you’ll usually need to be employed or running your own business with a consistent income. Most banks ask for a valid UAE residency visa, a certain income threshold, and a clean credit report.',
  },
  {
    question: 'What’s the least I need for a down payment in Dubai?',
    answer:
      'UAE citizens can put down as little as 15% of the property price. UAE residents: 20%. Non-residents: around 25%. Varies by lender.',
  },
  {
    question: 'Is it possible for non-residents to get a UAE mortgage?',
    answer:
      'Yes—non-residents can apply. The loan-to-value ratio is usually lower. We specialize in helping international buyers.',
  },
  {
    question: 'What are the current interest rates for mortgages in Dubai?',
    answer:
      'Rates typically range between 3.5% and 5.5%, depending on loan type, bank, and your financial profile.',
  },
  {
    question: 'What paperwork do I need to apply for a Dubai mortgage?',
    answer: `If you're salaried:\n- Passport\n- Emirates ID\n- Residency Visa\n- Salary Certificate\n- Payslips\n- Bank Statements (6 months)\n\nIf you're self-employed:\n- Trade License\n- MOA\n- Business Bank Statements\n- VAT Documents\n- Audited Financials (if any)`,
  },
  {
    question: 'What’s the maximum loan term for a mortgage in the UAE?',
    answer: 'Up to 25 years, but must be repaid before age 65 (employed) or 70 (self-employed).',
  },
  {
    question: 'Can I get a mortgage for an off-plan property in Dubai?',
    answer:
      'Yes. But banks usually require a higher down payment. Mortgages activate after construction hits certain milestones.',
  },
  {
    question: 'What types of mortgage rates are offered in Dubai?',
    answer: `- Fixed Rate: Locked monthly payments\n- Floating Rate: Linked to EIBOR, varies with market`,
  },
  {
    question: 'Is refinancing an option for mortgages in Dubai?',
    answer:
      'Yes. Refinancing helps reduce interest or extend your term. We help compare options across multiple lenders.',
  },
  {
    question: 'How much can I borrow for a mortgage in Dubai?',
    answer:
      'Depends on income, liabilities, credit score, and property value. Most banks cap mortgage payments to 50% of your monthly income.',
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-100 to-gray-200 px-6 py-20">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900">Frequently Asked Questions</h1>
          <p className="text-gray-600 mt-4 text-lg">
            Everything you need to know about mortgages in Dubai, explained clearly.
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl border border-gray-200 transition-all duration-300"
            >
              <button
                onClick={() => toggle(index)}
                className="flex items-center justify-between w-full text-left px-6 py-5 font-medium text-gray-900 hover:bg-gray-50 transition"
              >
                <span className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-blue-600" />
                  {faq.question}
                </span>
                <span className="ml-4">
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-600" />
                  )}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5 text-gray-700 whitespace-pre-line leading-relaxed border-t border-gray-100 bg-gray-50">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}