import React from 'react'
import AuthForm from '@/app/component/AuthForm'

export default function Login() {
  return <AuthForm title="Sign in" buttonText="Sign In" isLogin={true} />;
}