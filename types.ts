
export enum AppSection {
  LOGIN = 'login',
  SEARCH = 'search',
  FAVORITES = 'favorites',
  COMMUNITY = 'community',
  AI_ASSISTANT = 'ai_assistant',
  BUSINESS = 'business'
}

export interface TravelDestination {
  id: string;
  name: string;
  country: string;
  description: string;
  imageUrl: string;
  xrPreviewUrl?: string; // URL for the immersive XR/360 video/view
  rating: number;
  sustainabilityScore: number;
  priceLevel: '€' | '€€' | '€€€' | '€€€€';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface CommunityPost {
  id: string;
  author: string;
  avatar: string;
  content: string;
  imageUrl?: string;
  likes: number;
  comments: number;
  tags: string[];
}
