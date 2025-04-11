export interface User {
    id: string;
    email: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface SignUpData {
    name: string;
    email: string;
    password: string;
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