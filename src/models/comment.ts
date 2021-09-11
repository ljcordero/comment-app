import { User } from "./user";

export interface Comment {
  id?: string;
  content: string;
  createdAt: Date;
  createdBy: User;
  subComments?: Comment[];
  likedBy?: User[];
}
