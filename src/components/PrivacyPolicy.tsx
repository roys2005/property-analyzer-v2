// src/components/PrivacyPolicy.tsx
import React from 'react';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-3xl border border-gray-200 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-gray-500 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>
        
        <div className="prose prose-emerald max-w-none text-gray-600 space-y-6">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Information We Collect</h2>
            <p>We collect information that you provide directly to us, including when you create an account, update your profile, use the interactive features of our Services, or request customer support. The types of information we may collect include your name, email address, password, payment information, and any other information you choose to provide.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. How We Use Your Information</h2>
            <p>We use the information we collect to provide, maintain, and improve our Services, such as to:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Process transactions and send related information, including confirmations and receipts.</li>
              <li>Send you technical notices, updates, security alerts, and support messages.</li>
              <li>Respond to your comments, questions, and requests and provide customer service.</li>
              <li>Communicate with you about products, services, offers, and events offered by Property Analyzer.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Data Security</h2>
            <p>We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction. We use industry-standard encryption to protect your data in transit and at rest.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at support@propertyanalyzer.com.</p>
          </section>
        </div>
      </div>
    </div>
  );
};