import React from 'react'
import AuthForm from '@/app/component/AuthForm'

export default function Register() {
  return <AuthForm title="Sign up" buttonText="Sign Up" isLogin={false} />;
}