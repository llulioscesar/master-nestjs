import { Inject, Injectable } from '@nestjs/common';
import { GrpcService } from '@nestjs/microservices';
import { Comment } from '../../domain/models';
import { CommentsService as Service } from '../../domain/services';
import { CommentsService } from './comments.service';

@Injectable()
@GrpcService()
export class CommentsServiceGrpc implements Service {
  constructor(
    @Inject(CommentsService)
    private readonly service: CommentsService,
  ) {}

  async countCommentsForPublicationIds(
    publicationIds: string[],
  ): Promise<Comment[]> {
    return this.service.countCommentsForPublicationIds(publicationIds);
  }

  async create(comment: Comment): Promise<Comment> {
    return this.service.create(comment);
  }

  async delete(id: string): Promise<void> {
    return this.service.delete(id);
  }

  async getByPublicationId(publicationId: string): Promise<Comment[]> {
    return this.service.getByPublicationId(publicationId);
  }
}
