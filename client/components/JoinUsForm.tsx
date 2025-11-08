
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';

export default function JoinUsForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    class: '',
    school: '',
    phone: '',
    whatsapp: '',
    age: '',
  });
  const [isSameAsPhone, setIsSameAsPhone] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSameAsPhone(e.target.checked);
    if (e.target.checked) {
      setFormData((prevData) => ({
        ...prevData,
        whatsapp: prevData.phone,
      }));
    }
  };

  useEffect(() => {
    if (isSameAsPhone) {
      setFormData((prevData) => ({
        ...prevData,
        whatsapp: prevData.phone,
      }));
    }
  }, [formData.phone, isSameAsPhone]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Get response text first to check if it's JSON
      const responseText = await response.text();
      
      // Check if response is HTML (error page)
      if (responseText.trim().startsWith("<!DOCTYPE") || responseText.trim().startsWith("<html") || responseText.trim().startsWith("A server")) {
        console.error("Server returned HTML instead of JSON:", responseText.substring(0, 200));
        throw new Error("Server error: Please check if the server is running and API routes are configured correctly.");
      }

      let result;
      try {
        result = JSON.parse(responseText);
      } catch (parseError) {
        console.error("Failed to parse response:", responseText.substring(0, 200));
        throw new Error("Invalid response from server. Please try again.");
      }

      if (!response.ok || !result.ok) {
        throw new Error(result.error || 'Failed to submit form');
      }

      setIsSubmitted(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Error sending form data:', error);
      alert(error instanceof Error ? error.message : 'Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ ease: "easeInOut", duration: 0.3 }}
        className="bg-[#f5f5f7] rounded-[20px] shadow-[0_10px_30px_rgba(0,0,0,.06)] w-full max-w-lg mx-auto relative overflow-hidden flex flex-col"
        style={{ maxHeight: '90vh' }}
      >
        <div className="p-6 sm:p-8 flex-shrink-0">
            <button
              onClick={onClose}
              type="button"
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-7 h-7" />
            </button>
            <h1 className="m-0 mb-1 font-semibold text-xl sm:text-2xl tracking-[-0.01em] text-center">Student Registration</h1>
            <p className="m-0 mb-4 text-[#6b7280] text-center text-sm">Join Skillence coaching. Simple. Clear. Fast.</p>
            <div className="h-px bg-gradient-to-r from-transparent via-[#e5e7eb] to-transparent my-2 mb-4" aria-hidden="true"></div>
        </div>
        <div className="overflow-y-auto px-6 sm:px-8 pb-6 sm:pb-8">
          <AnimatePresence>
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ ease: "easeInOut", duration: 0.3 }}
                className="flex flex-col items-center justify-center p-8 sm:p-12 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 20 }}
                  className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mb-6"
                >
                  <Check className="w-12 h-12 text-white" />
                </motion.div>
                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-2">Thank You</h2>
                <p className="text-gray-500 text-base sm:text-lg">Your submission has been received.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid gap-3">
                  <div className="grid gap-1.5">
                    <label htmlFor="name" className="text-xs text-[#374151]">Full name</label>
                    <input id="name" name="name" type="text" placeholder="e.g. Tushar Chauhan" required className="w-full box-border p-3 px-4 border border-[#e5e7eb] rounded-xl bg-white text-sm transition-colors duration-150 ease-in-out outline-none focus:border-[#cfd2d7] focus:shadow-[0_0_0_4px_rgba(0,0,0,.04)] placeholder-[#9ca3af]" value={formData.name} onChange={handleChange} />
                  </div>
                  <div className="grid gap-1.5">
                    <label htmlFor="address" className="text-xs text-[#374151]">Address</label>
                    <textarea id="address" name="address" required className="w-full box-border p-3 px-4 border border-[#e5e7eb] rounded-xl bg-white text-sm transition-colors duration-150 ease-in-out outline-none focus:border-[#cfd2d7] focus:shadow-[0_0_0_4px_rgba(0,0,0,.04)] placeholder-[#9ca3af]" value={formData.address} onChange={handleChange}></textarea>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="grid gap-1.5">
                      <label htmlFor="class" className="text-xs text-[#374151]">Class</label>
                      <input id="class" name="class" type="text" placeholder="e.g. 12th, BCA, BTECH" required className="w-full box-border p-3 px-4 border border-[#e5e7eb] rounded-xl bg-white text-sm transition-colors duration-150 ease-in-out outline-none focus:border-[#cfd2d7] focus:shadow-[0_0_0_4px_rgba(0,0,0,.04)] placeholder-[#9ca3af]" value={formData.class} onChange={handleChange} />
                    </div>
                    <div className="grid gap-1.5">
                      <label htmlFor="age" className="text-xs text-[#374151]">Age</label>
                      <input id="age" name="age" type="number" required className="w-full box-border p-3 px-4 border border-[#e5e7eb] rounded-xl bg-white text-sm transition-colors duration-150 ease-in-out outline-none focus:border-[#cfd2d7] focus:shadow-[0_0_0_4px_rgba(0,0,0,.04)] placeholder-[#9ca3af]" value={formData.age} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="grid gap-1.5">
                    <label htmlFor="school" className="text-xs text-[#374151]">School/College</label>
                    <input id="school" name="school" type="text" placeholder="e.g. DPS, SPRC, Gateway" required className="w-full box-border p-3 px-4 border border-[#e5e7eb] rounded-xl bg-white text-sm transition-colors duration-150 ease-in-out outline-none focus:border-[#cfd2d7] focus:shadow-[0_0_0_4px_rgba(0,0,0,.04)] placeholder-[#9ca3af]" value={formData.school} onChange={handleChange} />
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="grid gap-1.5">
                      <label htmlFor="phone" className="text-xs text-[#374151]">Phone</label>
                      <input id="phone" name="phone" type="tel" placeholder="+91 98xxxxxxxx" required className="w-full box-border p-3 px-4 border border-[#e5e7eb] rounded-xl bg-white text-sm transition-colors duration-150 ease-in-out outline-none focus:border-[#cfd2d7] focus:shadow-[0_0_0_4px_rgba(0,0,0,.04)] placeholder-[#9ca3af]" value={formData.phone} onChange={handleChange} />
                    </div>
                    <div className="grid gap-1.5">
                      <label htmlFor="whatsapp" className="text-xs text-[#374151]">WhatsApp Number</label>
                      <input id="whatsapp" name="whatsapp" type="tel" placeholder="+91 98xxxxxxxx" required className="w-full box-border p-3 px-4 border border-[#e5e7eb] rounded-xl bg-white text-sm transition-colors duration-150 ease-in-out outline-none focus:border-[#cfd2d7] focus:shadow-[0_0_0_4px_rgba(0,0,0,.04)] placeholder-[#9ca3af]" disabled={isSameAsPhone} value={formData.whatsapp} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="flex items-center mt-1">
                    <input id="sameAsPhone" type="checkbox" checked={isSameAsPhone} onChange={handleCheckboxChange} className="h-4 w-4 bg-[#333336] border-gray-500 rounded text-blue-600 focus:ring-blue-500 transition-colors" />
                    <label htmlFor="sameAsPhone" className="ml-2 block text-xs text-gray-500">WhatsApp number is the same as phone</label>
                  </div>
                  <button className="inline-flex items-center justify-center w-full p-3.5 mt-2 rounded-xl border border-[#111] bg-[#111] text-white font-semibold text-sm cursor-pointer transition-opacity duration-150 ease-in-out active:translate-y-px disabled:opacity-60 disabled:cursor-not-allowed" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Submit'}</button>
                  
                </div>
              </form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
