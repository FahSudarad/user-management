'use client';
import React, { useState, useEffect  } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser, registerUser } from '../../utils/api';
import Image from 'next/image';
import { toast, Toaster } from 'sonner';
import pattern from '../../../public/pattern.png';

interface AuthFormProps {
  title: string;
  buttonText: string;
  isLogin: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ title, buttonText, isLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (!isLogin) return;

    const storedEmail = localStorage.getItem('tempEmail');
    const storedPassword = localStorage.getItem('tempPassword');

    if (storedEmail && storedPassword) {
      setEmail(storedEmail);
      setPassword(storedPassword);
      
      localStorage.removeItem('tempEmail');
      localStorage.removeItem('tempPassword');
    }
  }, [isLogin]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      if (isLogin) {
        const response = await loginUser(email, password);
        if (response.data.token) {
          localStorage.setItem('authToken', response.data.token);
          toast.success('Log in successfully');
          router.push('/user-management');
        } else {
          toast.error('Invalid credentials');
        }
      } else {
        const response = await registerUser(email, password);
        if (response.data.id) {
          localStorage.setItem('tempEmail', email);
          localStorage.setItem('tempPassword', password);
          router.push('/login');
        } else {
          toast.error('Registration failed');
        }
      }
    } catch (error: any) {
      toast.error('An error occurred. Please try again.');
    }
  };
  

  return (
    <div className="flex flex-col md:flex-row min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-md md:max-w-4xl">
        <div className="flex-1 p-8 md:p-12">
          <h1 className="text-2xl font-bold text-orange-500 mb-6 text-center md:text-left">Logo Here</h1>
          <h3 className="text-3xl font-bold mb-6 text-center md:text-left text-black">{title}</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-600">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-gray-600">Password</label>
              <div className="flex flex-col items-end">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 mb-2"
                  style={{ color: 'black !important' }}
                />
                {isLogin && (
                  <a href="#" className="text-xs text-gray-500 mt-2 md:mt-0 hover:underline">
                    Forgot Password?
                  </a>
                )}
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="flex items-center justify-center px-4 py-3 bg-orange-500 text-white hover:bg-orange-600 transition duration-200 rounded-3xl"
              >
                {buttonText}<span className="ml-4">→</span>
              </button>
            </div>
          </form>

          <div className="text-center mt-4 text-gray-500">
            {isLogin ? (
              <p>
                I don’t have an account?{' '}
                <a href="/register" className="text-orange-500 hover:underline">
                  Sign up
                </a>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <a href="/login" className="text-orange-500 hover:underline">
                  Sign in
                </a>
              </p>
            )}
          </div>
        </div>

        <div className="hidden md:flex md:flex-1 bg-cover bg-center bg-[#FFEDE1]">
          <Image src={pattern} alt="Decorative Pattern" />
        </div>
      </div>

      <Toaster position="top-center" richColors />
    </div>
  );
};

export default AuthForm;
