import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../lib/localData';
import { UserIcon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';

const fetchUser = async () => (await api.get('/user')).data;
const updateUser = async (userData) => (await api.put('/user', userData)).data;

// Reusable Form Input Component with RTL adjustments
const FormInput = ({ label, name, icon: Icon, ...props }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <div className="relative">
      {/* Icon on the Right (Start) */}
      <div className="absolute inset-y-0 start-0 ps-3 flex items-center pointer-events-none">
        <Icon className="h-5 w-5 text-gray-400"/>
      </div>
      {/* Padding on the Right (Start) */}
      <input
        id={name}
        name={name}
        {...props}
        className="w-full ps-10 p-2.5 border rounded-lg text-right focus:ring-1 focus:ring-primary-blue focus:border-primary-blue"
      />
    </div>
  </div>
);

const ProfilePage = () => {
  const queryClient = useQueryClient();
  const [profileData, setProfileData] = useState(null);

  const { data: user, isLoading } = useQuery({ queryKey: ['user'], queryFn: fetchUser });

  const currentProfile = profileData ?? user ?? {};

  const mutation = useMutation({
    mutationFn: updateUser,
    onSuccess: (updatedUserData) => {
      queryClient.setQueryData(['user'], updatedUserData);
      alert('پروفایل با موفقیت ذخیره شد!');
    },
    onError: (error) => alert(`خطا در ذخیره پروفایل: ${error.message}`),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...user, ...prev, [name]: value }));
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    mutation.mutate(currentProfile);
  };

  if (isLoading) return <p className="p-8">در حال بارگذاری پروفایل...</p>;

  return (
    <div className="p-4 sm:p-8 text-right" dir="rtl">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">پروفایل شما</h1>
        <p className="text-sm text-gray-600 mb-6">اطلاعات شخصی خود را مدیریت کنید.</p>

        <form onSubmit={handleSaveChanges} className="space-y-6">
            <FormInput
              label="نام کامل"
              name="fullName"
              value={currentProfile.fullName || ''}
              onChange={handleInputChange}
              icon={UserIcon}
            />
            <div className="grid md:grid-cols-2 gap-6">
                <FormInput
                  label="آدرس ایمیل"
                  name="email"
                  type="email"
                  value={currentProfile.email || ''}
                  onChange={handleInputChange}
                  icon={EnvelopeIcon}
                  dir="ltr" // Keep email LTR for correct rendering
                  style={{ textAlign: 'left' }}
                />
                <FormInput
                  label="شماره تلفن"
                  name="phone"
                  type="tel"
                  value={currentProfile.phone || ''}
                  onChange={handleInputChange}
                  icon={PhoneIcon}
                  dir="ltr" // Keep phone LTR for correct rendering
                  style={{ textAlign: 'left' }}
                />
            </div>
            {/* Add other fields like organization, job title, bio here */}
            {/* In RTL, justify-end pushes items to the Left (end of the container) */}
            <div className="border-t pt-6 flex justify-end">
                <button
                  type="submit"
                  disabled={mutation.isPending}
                  className="px-6 py-2.5 bg-primary-blue text-white rounded-lg font-semibold hover:bg-primary-blue/90 disabled:opacity-50"
                >
                    {mutation.isPending ? 'در حال ذخیره...' : 'ذخیره تغییرات'}
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
