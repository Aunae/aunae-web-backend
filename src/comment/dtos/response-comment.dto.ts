import { User } from 'src/user/entities/user.entities';
import { Comment } from '../entities/comment.entities';

export class ResponseCommentDto {
  id: string;
  description: string;
  author: User;
  parent?: Comment | null;
  children?: Comment[] | null;
  createdAt: Date;
  updatedAt: Date;
}
