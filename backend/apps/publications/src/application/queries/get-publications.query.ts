import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PublicationsService } from '../services';
import { ListPublications } from '../../domain/models';

export class GetPublicationsQuery implements IQuery {
  constructor(public readonly page: number) {}
}

@QueryHandler(GetPublicationsQuery)
export class GetPublicationsHandler
  implements IQueryHandler<GetPublicationsQuery>
{
  constructor(private readonly service: PublicationsService) {}

  async execute(query: GetPublicationsQuery): Promise<ListPublications> {
    const { page } = query;
    return await this.service.get(page);
  }
}
