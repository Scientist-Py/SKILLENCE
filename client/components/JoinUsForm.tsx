import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Sparkles, Home, Laptop, ArrowRight, ArrowLeft } from 'lucide-react';

interface JoinUsFormProps {
  onClose: () => void;
  initialPlan?: string;
}

const PLANS = [
  {
    id: 'full',
    name: 'Full 5-Month Master Plan',
    price: '₹5,999',
    badge: 'Best Value • Save ₹1,501',
    description: 'All-inclusive 5-Month pass, 120+ projects, 1-on-1 mentorship & certificate.',
    icon: Sparkles,
    popular: true,
  },
  {
    id: 'monthly',
    name: 'Flexible Monthly Plan',
    price: '₹1,500 / mo',
    badge: '5 Months Program',
    description: 'Pay month-by-month as you learn. No long-term lock-in.',
    icon: Laptop,
    popular: false,
  },
  {
    id: 'home_demo',
    name: '🏠 1-on-1 Home Tuition Demo',
    price: 'Free Demo',
    badge: 'Exclusively in Baghpat',
    description: 'Personal in-person demo class at your home in Baghpat.',
    icon: Home,
    popular: false,
  },
  {
    id: 'online_demo',
    name: '💻 Live Online Class Demo',
    price: 'Free Demo',
    badge: 'Available Everywhere',
    description: 'Interactive live online demo batch with practical project building.',
    icon: Laptop,
    popular: false,
  },
];

export default function JoinUsForm({ onClose, initialPlan }: JoinUsFormProps) {
  const [step, setStep] = useState<1 | 2>(initialPlan ? 2 : 1);
  const [selectedPlanId, setSelectedPlanId] = useState<string>(initialPlan || 'full');
  
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    class: '',
    school: '',
    phone: '',
    whatsapp: '',
    age: '',
    selectedPlan: PLANS.find(p => p.id === (initialPlan || 'full'))?.name || 'Full 5-Month Master Plan (₹5,999)',
  });
  
  const [isSameAsPhone, setIsSameAsPhone] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedPlanObj = PLANS.find(p => p.id === selectedPlanId) || PLANS[0];

  const handlePlanSelect = (planId: string) => {
    setSelectedPlanId(planId);
    const plan = PLANS.find(p => p.id === planId);
    if (plan) {
      setFormData(prev => ({
        ...prev,
        selectedPlan: `${plan.name} (${plan.price})`,
      }));
    }
  };

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

      const result = await response.json();

      if (!response.ok || !result.ok) {
        throw new Error(result.error || 'Failed to submit form');
      }

      setIsSubmitted(true);
      setTimeout(() => {
        onClose();
      }, 2500);
    } catch (error) {
      console.error('Error sending form data:', error);
      alert(error instanceof Error ? error.message : 'Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center z-50 p-4 font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ ease: "easeInOut", duration: 0.25 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg mx-auto relative overflow-hidden flex flex-col border border-gray-100"
        style={{ maxHeight: '92vh' }}
      >
        {/* Modal Header */}
        <div className="p-6 pb-4 sm:p-7 sm:pb-4 flex-shrink-0 border-b border-gray-100 relative">
          <button
            onClick={onClose}
            type="button"
            className="absolute top-5 right-5 text-gray-400 hover:text-black p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider bg-black text-white px-2.5 py-0.5 rounded-full">
              Step {step} of 2
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-center text-gray-900">
            {step === 1 ? "Choose Your Plan or Free Demo" : "Enter Your Student Details"}
          </h2>
          <p className="text-gray-500 text-center text-xs sm:text-sm mt-1">
            {step === 1 ? "Select the learning option that fits your goals best" : "Fill in your details to secure your seat / demo"}
          </p>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto px-6 sm:px-7 py-5">
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                key="submitted"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ ease: "easeInOut", duration: 0.3 }}
                className="flex flex-col items-center justify-center py-8 sm:py-12 text-center"
              >
                <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mb-5 shadow-lg shadow-emerald-500/20">
                  <Check className="w-10 h-10 text-white stroke-[3]" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Registration Received!</h3>
                <p className="text-gray-600 text-sm max-w-xs mx-auto">
                  Thank you, <strong>{formData.name}</strong>. Our team will contact you shortly on WhatsApp to confirm your plan / demo.
                </p>
              </motion.div>
            ) : step === 1 ? (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-3"
              >
                {PLANS.map((plan) => {
                  const isSelected = selectedPlanId === plan.id;
                  const Icon = plan.icon;
                  return (
                    <div
                      key={plan.id}
                      onClick={() => handlePlanSelect(plan.id)}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 relative ${
                        isSelected
                          ? 'border-black bg-gray-50 shadow-md scale-[1.01]'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50/50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-xl mt-0.5 ${isSelected ? 'bg-black text-white' : 'bg-gray-100 text-gray-700'}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className="font-bold text-gray-900 text-sm sm:text-base">{plan.name}</h4>
                              {plan.badge && (
                                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                                  plan.popular ? 'bg-amber-100 text-amber-900' : 'bg-gray-200 text-gray-800'
                                }`}>
                                  {plan.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 mt-1 leading-relaxed">{plan.description}</p>
                          </div>
                        </div>

                        <div className="text-right flex-shrink-0">
                          <span className="text-base sm:text-lg font-black text-gray-900 block">{plan.price}</span>
                          <div className={`w-5 h-5 rounded-full border-2 mt-2 ml-auto flex items-center justify-center ${
                            isSelected ? 'border-black bg-black' : 'border-gray-300'
                          }`}>
                            {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full mt-4 py-3.5 px-6 rounded-xl bg-black text-white font-semibold text-sm hover:bg-gray-800 transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>Continue with {selectedPlanObj.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
              >
                {/* Selected Plan Summary Pill */}
                <div className="mb-4 p-3 bg-gray-100 rounded-xl flex items-center justify-between border border-gray-200">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 font-medium">Selected:</span>
                    <span className="text-xs font-bold text-black">{selectedPlanObj.name} ({selectedPlanObj.price})</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 underline ml-2"
                  >
                    Change
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid gap-1">
                    <label htmlFor="name" className="text-xs font-semibold text-gray-700">Full Name *</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      required
                      className="w-full p-2.5 px-3.5 border border-gray-300 rounded-xl text-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="grid gap-1">
                      <label htmlFor="phone" className="text-xs font-semibold text-gray-700">Phone Number *</label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+91 98XXXXXXXX"
                        required
                        className="w-full p-2.5 px-3.5 border border-gray-300 rounded-xl text-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="grid gap-1">
                      <label htmlFor="whatsapp" className="text-xs font-semibold text-gray-700">WhatsApp Number *</label>
                      <input
                        id="whatsapp"
                        name="whatsapp"
                        type="tel"
                        placeholder="+91 98XXXXXXXX"
                        required
                        disabled={isSameAsPhone}
                        className="w-full p-2.5 px-3.5 border border-gray-300 rounded-xl text-sm outline-none focus:border-black focus:ring-1 focus:ring-black disabled:bg-gray-100"
                        value={formData.whatsapp}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      id="sameAsPhone"
                      type="checkbox"
                      checked={isSameAsPhone}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 border-gray-300 rounded text-black focus:ring-black cursor-pointer"
                    />
                    <label htmlFor="sameAsPhone" className="ml-2 text-xs text-gray-600 cursor-pointer">
                      WhatsApp number is same as phone
                    </label>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="grid gap-1">
                      <label htmlFor="class" className="text-xs font-semibold text-gray-700">Class / Course *</label>
                      <input
                        id="class"
                        name="class"
                        type="text"
                        placeholder="e.g. 12th, BCA, B.Tech"
                        required
                        className="w-full p-2.5 px-3.5 border border-gray-300 rounded-xl text-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
                        value={formData.class}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="grid gap-1">
                      <label htmlFor="age" className="text-xs font-semibold text-gray-700">Age *</label>
                      <input
                        id="age"
                        name="age"
                        type="number"
                        placeholder="e.g. 19"
                        required
                        className="w-full p-2.5 px-3.5 border border-gray-300 rounded-xl text-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
                        value={formData.age}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="grid gap-1">
                    <label htmlFor="school" className="text-xs font-semibold text-gray-700">School / College *</label>
                    <input
                      id="school"
                      name="school"
                      type="text"
                      placeholder="e.g. DPS, SPRC, Gateway College"
                      required
                      className="w-full p-2.5 px-3.5 border border-gray-300 rounded-xl text-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
                      value={formData.school}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="grid gap-1">
                    <label htmlFor="address" className="text-xs font-semibold text-gray-700">Address / City (Mention Baghpat for Home Tuition) *</label>
                    <textarea
                      id="address"
                      name="address"
                      rows={2}
                      placeholder="e.g. Near Jain Mandir, Baghpat"
                      required
                      className="w-full p-2.5 px-3.5 border border-gray-300 rounded-xl text-sm outline-none focus:border-black focus:ring-1 focus:ring-black resize-none"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="py-3 px-4 rounded-xl border border-gray-300 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-all flex items-center gap-1"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 py-3 px-6 rounded-xl bg-black text-white font-semibold text-sm hover:bg-gray-800 transition-all disabled:opacity-50 shadow-lg"
                    >
                      {isSubmitting ? 'Submitting...' : 'Complete Registration →'}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

