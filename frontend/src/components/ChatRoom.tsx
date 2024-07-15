"use client"
import { useState, useEffect, useCallback } from 'react';
import io from 'socket.io-client';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

interface Message {
  sender: string;
  content: string;
}

interface User {
  username: string;
}

interface ChatRoomProps {
  user: User;
  token: string;
}

export default function ChatRoom({ user, token }: ChatRoomProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [socket, setSocket] = useState<SocketIOClient.Socket | null>(null);

  useEffect(() => {
    const newSocket = io('http://localhost:5000', {
      query: { token }
    });

    newSocket.on('connect', () => {
      console.log('Socket connected');
      setSocket(newSocket);
    });

    newSocket.on('message', (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    newSocket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    return () => {
      newSocket.disconnect();
    };
  }, [token]);

  const sendMessage = useCallback((content: string) => {
    if (socket && socket.connected) {
      const message = { sender: user.username, content };
      socket.emit('message', JSON.stringify(message)); // Stringify the message
    } else {
      console.error('Socket connection is not open');
    }
  }, [socket, user.username]);
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="mb-4 text-2xl font-bold text-center text-gray-700">Chat Room</h2>
        <div className="p-4 bg-gray-50 rounded-lg shadow-inner">
          <MessageList messages={messages} />
          <MessageInput sendMessage={sendMessage} />
        </div>
      </div>
    </div>
  );
}
