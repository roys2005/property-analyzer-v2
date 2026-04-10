// src/components/Contact.tsx
import React, { useState } from 'react';
import { Mail, MapPin, Send, Phone } from 'lucide-react';

export const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  
  // State to hold the form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  // ⚠️ REPLACE THIS WITH THE KEY SENT TO support@aipropertyanalyzer.com
  const WEB3FORMS_ACCESS_KEY = "79495678-106f-41b3-a5d7-ebebf423d9e0"; 

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: "New Contact Form Submission - AI Property Analyzer",
          from_name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          message: formData.message,
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        setIsSent(true);
        // Clear the form after successful send
        setFormData({ firstName: '', lastName: '', email: '', message: '' });
      } else {
        alert("Failed to send message. Please try again later.");
      }
    } catch (error) {
      console.error("Email submission error:", error);
      alert("An error occurred while sending the message.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-500">Have questions about AI Property Analyzer? We'd love to hear from you.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-start gap-4">
              <div className="bg-emerald-50 p-3 rounded-xl text-emerald-500"><Mail className="w-6 h-6" /></div>
              <div>
                <h3 className="font-bold text-gray-900">Email</h3>
                <p className="text-gray-500 text-sm mt-1">support@aipropertyanalyzer.com</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-start gap-4">
              <div className="bg-emerald-50 p-3 rounded-xl text-emerald-500"><Phone className="w-6 h-6" /></div>
              <div>
                <h3 className="font-bold text-gray-900">Phone</h3>
                <p className="text-gray-500 text-sm mt-1">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-start gap-4">
              <div className="bg-emerald-50 p-3 rounded-xl text-emerald-500"><MapPin className="w-6 h-6" /></div>
              <div>
                <h3 className="font-bold text-gray-900">Office</h3>
                <p className="text-gray-500 text-sm mt-1">123 Real Estate Blvd<br />Suite 400<br />Austin, TX 78701</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2">
            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
              {isSent ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-500">Thanks for reaching out. Our team will get back to you within 24 hours.</p>
                  <button onClick={() => setIsSent(false)} className="mt-6 text-emerald-600 font-medium hover:underline">Send another message</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">First Name</label>
                      <input 
                        type="text" 
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required 
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-gray-900 focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Last Name</label>
                      <input 
                        type="text" 
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required 
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-gray-900 focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Email Address</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required 
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-gray-900 focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Message</label>
                    <textarea 
                      rows={5} 
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required 
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-gray-900 focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all resize-none"
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-500/50 text-white font-bold py-3.5 rounded-xl transition-all flex justify-center items-center gap-2 shadow-md shadow-emerald-500/20"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};