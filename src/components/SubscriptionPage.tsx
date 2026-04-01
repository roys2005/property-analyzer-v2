import React from 'react';
import { Check, Zap, Shield, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/utils';

export const SubscriptionPage: React.FC = () => {
  const { user } = useAuth();

  const plans = [
    {
      name: 'Free',
      price: '0',
      description: 'Perfect for getting started with property analysis.',
      features: [
        '5 analyses per month',
        'Basic financial metrics',
        'Standard property data',
        'Email support',
      ],
      buttonText: 'Current Plan',
      current: user?.subscription === 'free',
    },
    {
      name: 'Pro',
      price: '29',
      description: 'Advanced tools for serious real estate investors.',
      features: [
        'Unlimited analyses',
        'AI-powered Gemini insights',
        'Advanced ROI projections',
        'Save unlimited deals',
        'Priority support',
        'Export reports to PDF',
      ],
      buttonText: 'Upgrade to Pro',
      current: user?.subscription === 'pro',
      highlight: true,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-extrabold text-white mb-4">Simple, Transparent Pricing</h1>
        <p className="text-xl text-gray-400">Choose the plan that fits your investment goals.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={cn(
              "relative bg-[#161b2b] border rounded-3xl p-8 transition-all duration-300 hover:translate-y-[-4px]",
              plan.highlight ? "border-emerald-500 shadow-2xl shadow-emerald-500/10" : "border-gray-800"
            )}
          >
            {plan.highlight && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-emerald-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                Most Popular
              </div>
            )}

            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-gray-400 text-sm">{plan.description}</p>
            </div>

            <div className="mb-8">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white">${plan.price}</span>
                <span className="text-gray-500">/month</span>
              </div>
            </div>

            <ul className="space-y-4 mb-10">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm text-gray-300">
                  <div className="mt-0.5 p-0.5 bg-emerald-500/10 rounded-full">
                    <Check className="w-4 h-4 text-emerald-500" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>

            <button
              className={cn(
                "w-full py-4 rounded-xl font-bold transition-all",
                plan.current 
                  ? "bg-gray-800 text-gray-400 cursor-default" 
                  : plan.highlight
                    ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20"
                    : "bg-white hover:bg-gray-100 text-gray-900"
              )}
            >
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>

      {/* Trust Section */}
      <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="space-y-3">
          <div className="w-12 h-12 bg-gray-800 rounded-2xl flex items-center justify-center mx-auto">
            <Shield className="w-6 h-6 text-emerald-500" />
          </div>
          <h4 className="text-lg font-bold text-white">Secure Payments</h4>
          <p className="text-sm text-gray-500">Powered by Stripe for 100% secure transactions.</p>
        </div>
        <div className="space-y-3">
          <div className="w-12 h-12 bg-gray-800 rounded-2xl flex items-center justify-center mx-auto">
            <Zap className="w-6 h-6 text-emerald-500" />
          </div>
          <h4 className="text-lg font-bold text-white">Instant Access</h4>
          <p className="text-sm text-gray-500">Get pro features immediately after upgrading.</p>
        </div>
        <div className="space-y-3">
          <div className="w-12 h-12 bg-gray-800 rounded-2xl flex items-center justify-center mx-auto">
            <Star className="w-6 h-6 text-emerald-500" />
          </div>
          <h4 className="text-lg font-bold text-white">Cancel Anytime</h4>
          <p className="text-sm text-gray-500">No long-term contracts. Cancel your sub with one click.</p>
        </div>
      </div>
    </div>
  );
};
