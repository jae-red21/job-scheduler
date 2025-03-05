export type User = {
    id: string;
    username: string;
    email: string;
    password: string;
    role: "supervisor" | "agent";  
    isAvailable: boolean;          
    createdAt: Date;
  };
  