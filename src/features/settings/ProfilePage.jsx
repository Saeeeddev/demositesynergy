import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../lib/axios';
import { UserIcon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';

const fetchUser = async () => (await api.get('/user')).data;
const updateUser = async (userData) => (await api.put('/user', userData)).data;

const ProfilePage = () => {
  const queryClient = useQueryClient();
  const [profileData, setProfileData] = useState({});

  const { data: user, isLoading } = useQuery({ queryKey: ['user'], queryFn: fetchUser });

  useEffect(() => {
    if (user) setProfileData(user);
  }, [user]);

  const mutation = useMutation({
    mutationFn: updateUser,
    onSuccess: (updatedUserData) => {
      queryClient.setQueryData(['user'], updatedUserData); // Optimistically update the cache
      alert('Profile saved successfully!');
    },
    onError: (error) => alert(`Error saving profile: ${error.message}`),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    mutation.mutate(profileData);
  };
  
  if (isLoading) return <p>Loading profile...</p>;

  return (
    <div className="p-4 sm:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Your Profile</h1>
        <p className="text-sm text-gray-600 mb-6">Manage your personal information.</p>
        
        <form onSubmit={handleSaveChanges} className="space-y-6">
            <FormInput label="Full Name" name="fullName" value={profileData.fullName || ''} onChange={handleInputChange} icon={UserIcon} />
            <div className="grid md:grid-cols-2 gap-6">
                <FormInput label="Email Address" name="email" type="email" value={profileData.email || ''} onChange={handleInputChange} icon={EnvelopeIcon} />
                <FormInput label="Phone Number" name="phone" type="tel" value={profileData.phone || ''} onChange={handleInputChange} icon={PhoneIcon} />
            </div>
            {/* Add other fields like organization, job title, bio here */}
            <div className="border-t pt-6 flex justify-end">
                <button type="submit" disabled={mutation.isPending} className="px-6 py-2.5 bg-primary-blue text-white rounded-lg font-semibold hover:bg-primary-blue/90 disabled:opacity-50">
                    {mutation.isPending ? 'Saving...' : 'Save Changes'}
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

const FormInput = ({ label, name, icon: Icon, ...props }) => (
  <div><label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label><div className="relative"><div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Icon className="h-5 w-5 text-gray-400"/></div><input id={name} name={name} {...props} className="w-full pl-10 p-2.5 border rounded-lg"/></div></div>
);

export default ProfilePage;