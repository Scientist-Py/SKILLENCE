import { X } from 'lucide-react';

export default function ContactPopup({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 font-sans">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-auto relative overflow-hidden p-8">
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-7 h-7" />
        </button>
        <h2 className="text-2xl font-semibold mb-6 text-center">Contact Us</h2>
        <div className="space-y-4">
          <a href="mailto:skillence.info@gmail.com" className="flex items-center justify-center w-full p-4 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors">
            Email: skillence.info@gmail.com
          </a>
          <a href="https://wa.me/919758781006?text=Hello,%20I%20want%20to%20enroll%20in%20the%20course"
             target="_blank"
             rel="noopener noreferrer"
             className="flex items-center justify-center w-full p-4 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors">
            WhatsApp
          </a>
          <a href="tel:9758781006" className="flex items-center justify-center w-full p-4 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors">
            Call: 9758781006
          </a>
        </div>
      </div>
    </div>
  );
}
