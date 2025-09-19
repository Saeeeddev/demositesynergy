import React from 'react';
import Header from '../website/Header';
import Footer from '../website/Footer';

const Contact = () => {
  return (
    <div className="min-h-screen font-sans bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      <Header useColoredLogo={true} />
      
      <main className="w-full flex justify-center pt-16">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <div className="w-full max-w-[1200px] mt-16 mb-16 py-16">
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">Contact Page</h1>
              <p className="text-gray-600">This is a placeholder for the contact page content.</p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
