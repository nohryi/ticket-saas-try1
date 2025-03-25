export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: "admin" | "user";
  createdAt: Date;
}

export const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    role: "admin",
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
    role: "user",
    createdAt: new Date("2024-01-15"),
  },
];

// Current mock user - this would come from auth context in real app
export const currentUser = mockUsers[0];
