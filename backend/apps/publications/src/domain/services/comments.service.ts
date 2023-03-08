import { Comment } from '../models';

export abstract class CommentsService {
  abstract getByPublicationId(publicationId: string): Promise<Comment[]>;
  abstract create(comment: Comment): Promise<Comment>;
  abstract delete(id: string): Promise<void>;
}
