import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserService } from '../services';
import { User } from '../../domain/models';

export class GetUsersnamesQuery implements IQuery {
  constructor(public readonly ids: string[]) {}
}

@QueryHandler(GetUsersnamesQuery)
export class GetUsersnamesHandler implements IQueryHandler<GetUsersnamesQuery> {
  constructor(private readonly service: UserService) {}

  async execute(query: GetUsersnamesQuery): Promise<User[]> {
    const { ids } = query;
    return await this.service.getUsersByIds(ids);
  }
}
