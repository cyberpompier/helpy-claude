import React, { useState, useEffect, useRef } from 'react';
import { Send, ArrowLeft } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import type { Message } from '../../types';

interface ChatInterfaceProps {
  conversationId: string;
  recipientName: string;
  onBack: () => void;
}

export default function ChatInterface({ conversationId, recipientName, onBack }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchMessages = async () => {
      if (!conversationId) return;
      
      setLoading(true);
      
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });
      
      if (error) {
        console.error('Error fetching messages:', error);
      } else if (data) {
        setMessages(data as Message[]);
      }
      
      setLoading(false);
    };

    fetchMessages();

    // Subscribe to new messages
    const subscription = supabase
      .channel(`messages:conversation_id=eq.${conversationId}`)
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'messages',
        filter: `conversation_id=eq.${conversationId}`
      }, (payload) => {
        setMessages(prev => [...prev, payload.new as Message]);
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [conversationId]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !user || !conversationId) return;
    
    const newMsg = {
      conversation_id: conversationId,
      sender_id: user.id,
      content: newMessage.trim(),
      read: false
    };
    
    const { error } = await supabase
      .from('messages')
      .insert([newMsg]);
    
    if (error) {
      console.error('Error sending message:', error);
    } else {
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white border-b px-4 py-3 flex items-center">
        <button 
          onClick={onBack}
          className="mr-3 text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-lg font-medium">{recipientName}</h2>
      </div>
      
      <div className="flex-grow overflow-y-auto p-4 bg-gray-50">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-500">Chargement des messages...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-500">Aucun message. Commencez la conversation!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender_id === user?.id ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${
                    message.sender_id === user?.id
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white border border-gray-200 text-gray-800'
                  }`}
                >
                  <p>{message.content}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.sender_id === user?.id ? 'text-indigo-200' : 'text-gray-500'
                    }`}
                  >
                    {new Date(message.created_at).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      
      <form onSubmit={handleSendMessage} className="bg-white border-t p-3">
        <div className="flex items-center">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Écrivez votre message..."
            className="flex-grow px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="bg-indigo-600 text-white p-2 rounded-r-md hover:bg-indigo-700 disabled:opacity-50"
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
}
