import type { User } from "./user";

export interface Author extends Omit<User, "password" | "confirmed"> {
  bio: string;
}

export interface Post {
  title: string;
  content: string;
  Tags?: string[];
  Author: Author;
  updatedAt: Date;
  createdAt: Date;
}
