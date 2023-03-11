import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  GetByIdRequest,
  GetByIdResponse,
} from '../../../../../proto/publications/publications.pb';
import { PublicationServiceGrpc } from '../services';

@Controller('publications')
export class PublicationsControllerGrpc {
  constructor(private readonly service: PublicationServiceGrpc) {}

  @GrpcMethod('PublicationsService', 'getById')
  async getPublication(data: GetByIdRequest): Promise<GetByIdResponse> {
    console.log(data);

    const result = await this.service.getById(data.id);
    return {
      id: result.id,
      content: result.content,
      userId: result.userId,
      createdAt: result.createdAt.toISOString(),
      updatedAt: result.updatedAt.toISOString(),
    };
  }
}
