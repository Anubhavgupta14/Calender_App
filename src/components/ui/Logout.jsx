import React from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    router.push('/auth');
  };

  return (
    <Button
      onClick={handleLogout}
      className="bg-red-600 hover:bg-red-700 text-white"
    >
      Logout
    </Button>
  );
};

export default LogoutButton;