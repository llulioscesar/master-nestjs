import { Comment } from '../models';

export abstract class CommetRepositoryPort {
  abstract create(commet: Comment): Promise<Comment>;
  abstract delete(id: string): Promise<void>;
  abstract getForPostId(postId: string): Promise<Comment[]>;
  abstract countCommentsForPublicationIds(
    publicationIds: string[],
  ): Promise<Comment[]>;
}
