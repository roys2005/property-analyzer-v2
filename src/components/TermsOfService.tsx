// src/components/TermsOfService.tsx
import React from 'react';

export const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-3xl border border-gray-200 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service – AI Property Analyzer</h1>
        {/* Automatically uses today's date */}
        <p className="text-gray-500 mb-6">Effective Date: {new Date().toLocaleDateString()}</p>
        
        <p className="text-gray-600 mb-8 text-lg leading-relaxed">
          By using AI Property Analyzer (“Service”), operated by <strong>INSIGHTFORGE LLC</strong>, you agree to the following terms:
        </p>
        
        <div className="prose prose-emerald max-w-none text-gray-600 space-y-8">
          
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Use of Service</h2>
            <p>You agree to use the Service only for lawful purposes.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. No Financial or Investment Advice</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>The Service provides data-driven insights and estimates for informational purposes only.</li>
              <li>We do <strong>not</strong> provide financial, investment, or real estate advice.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Accuracy of Information</h2>
            <p>We do not guarantee the accuracy, completeness, or reliability of any data or estimates provided.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. User Responsibility</h2>
            <p>You are solely responsible for decisions made based on the information provided by the Service.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Limitation of Liability</h2>
            <p className="font-medium text-gray-700">
              <strong>INSIGHTFORGE LLC</strong> shall not be liable for any losses or damages arising from the use of the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Third-Party Services</h2>
            <p>The Service may rely on third-party APIs and data providers. We are not responsible for their accuracy or availability.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Termination</h2>
            <p>We reserve the right to suspend or terminate access at any time.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">8. Changes to Terms</h2>
            <p>We may update these Terms at any time.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">9. Contact</h2>
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