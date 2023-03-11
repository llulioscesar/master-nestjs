import { Inject, Injectable } from '@nestjs/common';
import { GrpcService } from '@nestjs/microservices';
import { PublicationsService as Service } from '../../domain/services';
import { ListPublications, Publication } from '../../domain/models';
import { PublicationsService } from './publication.service';

@Injectable()
@GrpcService()
export class PublicationServiceGrpc implements Service {
  constructor(
    @Inject(PublicationsService)
    private readonly service: PublicationsService,
  ) {}

  async create(publication: Publication): Promise<Publication> {
    return this.service.update(publication);
  }

  async delete(id: string): Promise<void> {
    return this.service.delete(id);
  }

  async get(page: number): Promise<ListPublications> {
    return this.service.get(page);
  }

  async getById(id: string): Promise<Publication> {
    return this.service.getById(id);
  }

  async update(publication: Publication): Promise<Publication> {
    return this.service.update(publication);
  }
}
