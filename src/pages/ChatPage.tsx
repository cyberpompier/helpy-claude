import React, { useState } from 'react';
import ConversationList from '../components/Chat/ConversationList';
import ChatInterface from '../components/Chat/ChatInterface';

export default function ChatPage() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [recipientName, setRecipientName] = useState<string>('');

  const handleSelectConversation = (id: string, name: string) => {
    setSelectedConversation(id);
    setRecipientName(name);
  };

  const handleBack = () => {
    setSelectedConversation(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow rounded-lg overflow-hidden h-[calc(100vh-200px)]">
        {selectedConversation ? (
          <ChatInterface 
            conversationId={selectedConversation} 
            recipientName={recipientName}
            onBack={handleBack}
          />
        ) : (
          <div className="h-full">
            <div className="border-b px-4 py-3">
              <h2 className="text-lg font-medium">Conversations</h2>
            </div>
            <ConversationList onSelectConversation={handleSelectConversation} />
          </div>
        )}
      </div>
    </div>
  );
}
