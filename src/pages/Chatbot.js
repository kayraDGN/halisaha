import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get('/api/chatbot')
      .then(res => setMessages(res.data))
      .catch(() => setMessages([
        { from: 'bot', text: 'Merhaba! Size nasıl yardımcı olabilirim?' }
      ]));
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post('/api/chatbot', { text: input });
      setMessages(prev => [...prev, ...res.data]);
      setInput('');
    } catch {
      // Hata yönetimi
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Sohbet Robotu</h1>
      <div className="bg-gray-100 rounded p-4 mb-4" style={{ minHeight: 300 }}>
        {messages.map((msg, i) => (
          <div key={i} className={msg.from === 'bot' ? 'text-blue-700 mb-2' : 'text-green-700 mb-2 text-right'}>
            <span className="inline-block px-3 py-1 rounded bg-white shadow">{msg.text}</span>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          className="flex-1 border p-2 rounded-l"
          placeholder="Mesajınızı yazın..."
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          disabled={loading}
        />
        <button onClick={handleSend} className="bg-blue-600 text-white px-4 py-2 rounded-r" disabled={loading}>
          Gönder
        </button>
      </div>
    </div>
  );
};

export default Chatbot;