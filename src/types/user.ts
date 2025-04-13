// src/types/user.ts
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'doctor' | 'patient' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

export interface SignUpData {
  name: string;
  email: string;
  password: string;
  role: 'doctor' | 'patient' | 'admin';
}

export interface SignInData {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
}

// Blog related types
export interface BlogPost {
  id: string;
  title: string;
  content: string;
  summary: string;
  authorId: string;
  authorName: string;
  publishedAt: Date;
  updatedAt: Date;
  slug: string;
  tags: string[];
  isPublished: boolean;
}

export interface BlogPostInput {
  title: string;
  content: string;
  summary: string;
  tags: string[];
  isPublished: boolean;
}