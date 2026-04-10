// src/components/PrivacyPolicy.tsx
import React from 'react';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-3xl border border-gray-200 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy – AI Property Analyzer</h1>
        <p className="text-gray-500 mb-6">Effective Date: {new Date().toLocaleDateString()}</p>
        
        <p className="text-gray-600 mb-8 text-lg leading-relaxed">
          AI Property Analyzer (“we,” “our,” or “us”), operated by <strong>INSIGHTFORGE LLC</strong>, respects your privacy and is committed to protecting your information.
        </p>
        
        <div className="prose prose-emerald max-w-none text-gray-600 space-y-8">
          
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Information We Collect</h2>
            <p className="mb-2">We may collect:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Personal information</strong> (e.g., email address)</li>
              <li><strong>Usage data</strong> (e.g., pages visited, interactions)</li>
              <li><strong>Input data</strong> (e.g., property addresses entered)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. How We Use Information</h2>
            <p className="mb-2">We use your information to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Provide and improve our services</li>
              <li>Generate rental estimates and property analysis</li>
              <li>Communicate with users</li>
              <li>Monitor and analyze usage trends</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Third-Party Services</h2>
            <p className="mb-2">We may use third-party services such as:</p>
            <ul className="list-disc pl-5 space-y-1 mb-3">
              <li>Rent data providers (e.g., RentCast)</li>
              <li>Location services (e.g., Google APIs)</li>
              <li>Payment processors (e.g., Stripe)</li>
            </ul>
            <p>These services may collect and process your data according to their own privacy policies.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Data Security</h2>
            <p>We implement reasonable security measures to protect your data, but no system is 100% secure.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Data Retention</h2>
            <p>We retain data only as long as necessary to provide services and comply with legal obligations.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Your Rights</h2>
            <p>You may request access, correction, or deletion of your personal data by contacting us.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time.</p>
          </section>

          {/* NEW DISCLAIMER SECTION */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">8. Disclaimer</h2>
            <p className="mb-4 font-medium text-gray-700">AI Property Analyzer provides estimates, data analysis, and insights for informational purposes only.</p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
              <li>This platform does <strong>NOT</strong> provide financial, investment, or real estate advice.</li>
              <li>All estimates (including rent estimates and comparable properties) are based on third-party data and algorithms and may be inaccurate or incomplete.</li>
              <li>Users should independently verify all information before making any financial or investment decisions.</li>
              <li><strong>INSIGHTFORGE LLC</strong> is not responsible for any decisions, losses, or damages resulting from the use of this platform.</li>
              <li>By using this Service, you agree to this disclaimer.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">9. Contact Us</h2>
            <p>
              Email:{' '}
              <a 
                href="mailto:support@aipropertyanalyzer.com" 
                className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
              >
                support@aipropertyanalyzer.com
              </a>
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};