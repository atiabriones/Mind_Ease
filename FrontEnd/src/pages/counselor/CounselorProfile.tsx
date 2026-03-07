import { useState } from 'react';
import { User, Shield } from 'lucide-react';

export default function CounselorProfile() {
  const [activeTab, setActiveTab] = useState('account'); // 'account' or 'security'

  return (
    <div className="p-8 bg-[#f8f9fa] min-h-full">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-white rounded-lg shadow-sm">
          <User className="text-[#548d8d]" size={24} />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-8 border-b border-gray-200 mb-8">
        <button
          onClick={() => setActiveTab('account')}
          className={`pb-2 px-1 font-semibold transition-colors ${
            activeTab === 'account' 
              ? 'text-[#548d8d] border-b-2 border-[#548d8d]' 
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          Account Settings
        </button>
        <button
          onClick={() => setActiveTab('security')}
          className={`pb-2 px-1 font-semibold transition-colors ${
            activeTab === 'security' 
              ? 'text-[#548d8d] border-b-2 border-[#548d8d]' 
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          Security
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        {activeTab === 'account' ? (
          <div className="max-w-4xl">
            {/* Profile Picture Section */}
            <div className="flex items-center gap-6 mb-8">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" 
                  alt="Profile" 
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
                />
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-[#4a90e2] text-white text-sm font-bold rounded-lg hover:bg-blue-600 transition-colors">
                  Upload New Photo
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-600 text-sm font-bold rounded-lg hover:bg-gray-200 transition-colors">
                  Remove Profile Picture
                </button>
              </div>
            </div>

            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <InputField label="Full Name" placeholder="Hanna Guswaith" />
              <InputField label="Work" placeholder="Therapist" />
              <InputField label="Employee ID" placeholder="2024-065" />
              <InputField label="Work Phone" placeholder="0987 567 4837" />
              <InputField label="License" placeholder="Registered Guidance Counselor" />
              <InputField label="Email Address" placeholder="hanna@gmail.com" />
              <InputField label="Specialization" placeholder="Academic and Career Counseling" />
              <InputField label="Office location" placeholder="Guidance Office - Room 201" />
              <div className="md:col-span-1">
                <InputField label="Experience" placeholder="6 years" />
              </div>
            </div>

            <div className="mt-10">
              <button className="px-8 py-3 bg-[#4a90e2] text-white font-bold rounded-lg hover:bg-blue-600 transition-all shadow-md">
                Update Profile
              </button>
            </div>
          </div>
        ) : (
          /* Security Section */
          <div className="max-w-md">
            <h2 className="text-lg font-bold text-gray-800 mb-2">Update Your Password</h2>
            <p className="text-sm text-gray-500 mb-8">Keep your account secure by setting a strong and unique password.</p>
            
            <div className="space-y-6">
              <InputField label="Current Password" type="password" placeholder="Enter current password" />
              <InputField label="New Password" type="password" placeholder="Create a new password" />
              <InputField label="Confirm New Password" type="password" placeholder="Re-enter new password" />
            </div>

            <div className="mt-10 flex gap-4">
              <button className="px-8 py-3 bg-gray-100 text-gray-600 font-bold rounded-lg hover:bg-gray-200 transition-all">
                Cancel
              </button>
              <button className="px-8 py-3 bg-[#548d8d] text-white font-bold rounded-lg hover:bg-[#437272] transition-all shadow-md">
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Reusable Input Component to keep code clean
function InputField({ label, placeholder, type = "text" }: { label: string, placeholder: string, type?: string }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-bold text-gray-700">{label}</label>
      <input 
        type={type}
        placeholder={placeholder}
        className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#548d8d] focus:border-transparent outline-none transition-all placeholder:text-gray-300 text-gray-700"
      />
    </div>
  );
}