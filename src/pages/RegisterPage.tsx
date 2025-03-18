import React from 'react';
import RegisterForm from '../components/Auth/RegisterForm';

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <RegisterForm />
    </div>
  );
}
