import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CommentsService } from '../services';
import { Comment } from '../../domain/models';

export class CountCommentsPublicationsQuery implements IQuery {
  constructor(public readonly publicationIds: string[]) {}
}

@QueryHandler(CountCommentsPublicationsQuery)
export class CountCommentsPublicationsHandler
  implements IQueryHandler<CountCommentsPublicationsQuery>
{
  constructor(private readonly service: CommentsService) {}

  async execute(query: CountCommentsPublicationsQuery): Promise<Comment[]> {
    const { publicationIds } = query;
    return await this.service.countCommentsForPublicationIds(publicationIds);
  }
}
