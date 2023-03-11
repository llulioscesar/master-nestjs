import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Publication } from '../../domain/models';
import { PublicationsService } from '../services';

export class GetPublicationQuery implements IQuery {
  constructor(public readonly id: string) {}
}

@QueryHandler(GetPublicationQuery)
export class GetPublicationQueryHandler
  implements IQueryHandler<GetPublicationQuery>
{
  constructor(private readonly service: PublicationsService) {}

  async execute(query: GetPublicationQuery): Promise<Publication> {
    const { id } = query;

    return await this.service.getById(id);
  }
}
