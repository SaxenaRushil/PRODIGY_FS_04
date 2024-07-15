import { useEffect, useState } from 'react';
import axios from 'axios';

export default function MessageList({ messages }: any) {
  return (
    <div className="mb-4 overflow-y-auto h-96">
      {messages.map((msg: any, index: number) => (
        <div key={index} className="p-2 mb-2 border rounded">
          <strong>{msg.sender}</strong>: {msg.content}
        </div>
      ))}
    </div>
  );
}
