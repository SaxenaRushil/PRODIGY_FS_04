import { useState } from 'react';

export default function MessageInput({ sendMessage }) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(message);
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-grow p-2 border rounded"
      />
      <button type="submit" className="px-4 py-2 ml-2 text-white bg-blue-500 rounded">
        Send
      </button>
    </form>
  );
}
