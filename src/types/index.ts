export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  phone_number?: string;
  role: 'client' | 'artisan';
  created_at: string;
}

export interface Artisan {
  id: string;
  user_id: string;
  profession: string;
  description: string;
  hourly_rate: number;
  rating: number;
  is_available: boolean;
  latitude?: number;
  longitude?: number;
  created_at: string;
}

export interface Conversation {
  id: string;
  client_id: string;
  artisan_id: string;
  created_at: string;
  last_message?: string;
  last_message_time?: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  created_at: string;
  read: boolean;
}

export interface Location {
  latitude: number;
  longitude: number;
  accuracy?: number;
}

export interface EmergencyCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
}
