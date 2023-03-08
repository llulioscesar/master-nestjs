import { CommentsService } from '../services';
import { Comment } from '../../domain/models';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';

export class GetCommentsQuery implements IQuery {
  constructor(public readonly publicationId: string) {}
}

@QueryHandler(GetCommentsQuery)
export class GetCommentsHandler implements IQueryHandler<GetCommentsQuery> {
  constructor(private readonly service: CommentsService) {}

  async execute(query: GetCommentsQuery): Promise<Comment[]> {
    const { publicationId } = query;
    return await this.service.getByPublicationId(publicationId);
  }
}
