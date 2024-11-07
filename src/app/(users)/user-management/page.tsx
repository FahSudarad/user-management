'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/app/component/Sidebar';
import UserManagement from '@/app/component/UserManagement';

export default function UserManagementPage() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      router.push('/login');
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="flex flex-row">
      <Sidebar />
      <UserManagement />
    </div>
  );
}
