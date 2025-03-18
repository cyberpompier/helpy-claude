import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import type { Conversation } from '../../types';

interface ConversationListProps {
  onSelectConversation: (id: string, recipientName: string) => void;
}

export default function ConversationList({ onSelectConversation }: ConversationListProps) {
  const [conversations, setConversations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchConversations = async () => {
      if (!user) return;
      
      setLoading(true);
      
      // Get conversations where the user is either the client or the artisan
      const { data, error } = await supabase
        .from('conversations')
        .select(`
          *,
          client:client_id (id, full_name),
          artisan:artisan_id (
            id, 
            profiles:user_id (id, full_name)
          ),
          messages:messages (
            id, 
            content, 
            created_at,
            sender_id
          )
        `)
        .or(`client_id.eq.${user.id},artisan_id.eq.${user.id}`)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching conversations:', error);
      } else if (data) {
        // Process data to add last message and recipient name
        const processedData = data.map(conv => {
          // Sort messages by date to get the latest
          const sortedMessages = [...(conv.messages || [])].sort(
            (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
          
          // Determine recipient name based on user role
          let recipientName = '';
          if (conv.client_id === user.id) {
            // User is the client, so recipient is the artisan
            recipientName = conv.artisan?.profiles?.full_name || 'Artisan';
          } else {
            // User is the artisan, so recipient is the client
            recipientName = conv.client?.full_name || 'Client';
          }
          
          return {
            ...conv,
            last_message: sortedMessages[0]?.content || '',
            last_message_time: sortedMessages[0]?.created_at || conv.created_at,
            recipient_name: recipientName,
            unread_count: sortedMessages.filter(
              msg => msg.sender_id !== user.id && !msg.read
            ).length
          };
        });
        
        setConversations(processedData);
      }
      
      setLoading(false);
    };

    fetchConversations();
    
    // Subscribe to new messages
    const subscription = supabase
      .channel('public:messages')
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'messages'
      }, () => {
        // Refresh conversations when a new message is received
        fetchConversations();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Chargement des conversations...</p>
      </div>
    );
  }

  if (conversations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 p-4 text-center">
        <p className="text-gray-500 mb-4">Vous n'avez pas encore de conversations.</p>
        <p className="text-sm text-gray-400">
          Les conversations apparaîtront ici lorsque vous contacterez un artisan ou qu'un client vous contactera.
        </p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200">
      {conversations.map((conversation) => (
        <div
          key={conversation.id}
          onClick={() => onSelectConversation(conversation.id, conversation.recipient_name)}
          className="p-4 hover:bg-gray-50 cursor-pointer"
        >
          <div className="flex justify-between items-start">
            <h3 className="text-sm font-medium text-gray-900">{conversation.recipient_name}</h3>
            <span className="text-xs text-gray-500">
              {new Date(conversation.last_message_time).toLocaleDateString()}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-1 truncate">
            {conversation.last_message || 'Nouvelle conversation'}
          </p>
          {conversation.unread_count > 0 && (
            <div className="mt-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                {conversation.unread_count} non lu{conversation.unread_count > 1 ? 's' : ''}
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
