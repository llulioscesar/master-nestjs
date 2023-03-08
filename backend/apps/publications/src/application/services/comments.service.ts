import { Inject, Injectable } from '@nestjs/common';
import { CommentsService as Service } from '../../domain/services';
import { CommentsRepository } from '../../infrastructure/database';
import { Comment } from '../../domain/models';

@Injectable()
export class CommentsService implements Service {
  constructor(
    @Inject(CommentsRepository)
    private readonly repository: CommentsRepository,
  ) {}

  async create(comment: Comment): Promise<Comment> {
    return await this.repository.create(comment);
  }

  async delete(id: string): Promise<void> {
    return await this.repository.delete(id);
  }

  async getByPublicationId(publicationId: string): Promise<Comment[]> {
    return await this.repository.getForPostId(publicationId);
  }

  async countCommentsForPublicationIds(
    publicationIds: string[],
  ): Promise<Comment[]> {
    return await this.repository.countCommentsForPublicationIds(publicationIds);
  }
}
