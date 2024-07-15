"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';

import ChatRoom from '@/components/ChatRoom';
import Login from '@/components/Login';
import Register from '@/components/Register';
import {jwtDecode} from 'jwt-decode';

export default function Home() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');
  const [isRegistered, setIsRegistered] = useState(false); // State to manage form toggle

  useEffect(() => {
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        setUser(decoded);
      } catch (error) {
        console.error("Failed to decode JWT:", error);
      }
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      {user ? (
        <ChatRoom user={user} token={token} />
      ) : (
        <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
          {isRegistered ? (
            <Login setToken={setToken} />
          ) : (
            <Register onRegister={() => setIsRegistered(true)} />
          )}
        </div>
      )}
    </div>
  );
}
