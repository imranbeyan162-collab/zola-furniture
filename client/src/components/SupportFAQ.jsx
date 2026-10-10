import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, ShieldCheck, Truck, RefreshCw, CreditCard } from 'lucide-react';

export default function SupportFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: 'Where is Zola Furniture PLC located and do you deliver across Addis Ababa?',
      answer: 'Our main factory and showroom are based in Addis Ababa, Ethiopia. We provide white-glove delivery, room placement, and professional on-site assembly across all sub-cities including Bole, CMC, Kazanchis, Sarbet, Piazza, Ayat, Lebu, and Gerji. Regional deliveries across Ethiopia are also arranged via verified freight partners.'
    },
    {
      question: 'Can I order custom dimensions or bring my own fabric/color choice?',
      answer: 'Absolutely! Custom craftsmanship is our core specialty. If you need a sectional sofa configured to specific room dimensions (e.g., 3.4m x 2.1m) or desire a specific velvet shade, genuine leather, or linen weave, our master artisans will build it to your exact specifications.'
    },
    {
      question: 'What types of wood and structural materials do you use?',
      answer: 'Our tagline is "Quality and durability is our identity". We exclusively utilize properly kiln-dried local hardwoods such as Wanza, Tid, and treated Oak for load-bearing framing to prevent warping or cracking in Ethiopian climate fluctuations. Cushions utilize high-resilience 32-38 kg/m³ density foam.'
    },
    {
      question: 'What warranty is included with Zola Furniture purchases?',
      answer: 'All Zola Furniture handcrafted products carry a comprehensive 3-Year Structural Warranty covering timber joinery, internal framing, and spring suspension systems. We also offer lifetime maintenance and re-upholstery support.'
    },
    {
      question: 'What payment methods do you accept in Ethiopia?',
      answer: 'We accept Telebirr, Commercial Bank of Ethiopia (CBE), Awash Bank, Dashen Bank, direct wire transfers, and cash upon delivery after inspection.'
    },
    {
      question: 'How do I request an official price quotation for corporate or hotel projects?',
      answer: 'You can use the "Request Quote" button on any product card, fill out the message form on our Contact page, or call our direct project lines at 0935 745 559 and 0962 049 696.'
    }
  ];

  return (
    <section id="support-section" className="py-16 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c9a24a]/15 text-[#c9a24a] text-xs font-bold uppercase tracking-wider border border-[#c9a24a]/30 mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Customer Assistance</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading uppercase">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="text-xs sm:text-sm text-[#a69c8f] mt-1">
            Everything you need to know about purchasing, custom manufacturing, and deliveries
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="luxury-card overflow-hidden border border-[#3b3026] transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="text-xs sm:text-sm font-bold text-white tracking-wide font-heading">
                    {faq.question}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-[#1b1613] border border-[#c9a24a]/30 flex items-center justify-center shrink-0 text-[#c9a24a]">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-5 text-xs text-[#cfc7bc] leading-relaxed border-t border-[#352b22] pt-3 animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Banner */}
        <div className="mt-10 p-6 rounded-3xl bg-gradient-to-r from-[#29211b] via-[#201915] to-[#29211b] border border-[#c9a24a]/25 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-sm font-bold text-white font-heading uppercase">
              Have a question not listed here?
            </h4>
            <p className="text-xs text-[#a69c8f] mt-0.5">
              Speak directly with our Addis Ababa workshop managers today.
            </p>
          </div>
          <a
            href="tel:0935745559"
            className="gold-btn px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider shrink-0"
          >
            Call 0935 745 559
          </a>
        </div>

      </div>
    </section>
  );
}
