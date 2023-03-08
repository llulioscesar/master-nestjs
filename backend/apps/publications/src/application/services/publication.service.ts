import { Inject, Injectable } from '@nestjs/common';
import { PublicationService as Service } from '../../domain/services';
import { PublicationRepository } from '../../infrastructure/database';
import { ListPublications, Publication } from '../../domain/models';

@Injectable()
export class PublicationsService implements Service {
  constructor(
    @Inject(PublicationRepository)
    private readonly repository: PublicationRepository,
  ) {}

  async create(publication: Publication): Promise<Publication> {
    return await this.repository.create(publication);
  }

  async delete(id: string): Promise<void> {
    return await this.repository.delete(id);
  }

  async get(page: number): Promise<ListPublications> {
    return await this.repository.list(page);
  }

  async getById(id: string): Promise<Publication> {
    return await this.repository.findById(id);
  }

  async update(publication: Publication): Promise<Publication> {
    return await this.repository.update(publication);
  }
}
