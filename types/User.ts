export interface User {
  id: string;
  email: string;
  password: string; // hashed
  role: "ADMIN" | "SELLER" | "BIDDER";
  profile: {
    name: string;
    avatar?: string;
    address: string;
    phone?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
