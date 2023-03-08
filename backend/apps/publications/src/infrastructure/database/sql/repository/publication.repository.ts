import { PublicationRepositoryPort } from '../../../../domain/ports';
import { ListPublications, Publication } from '../../../../domain/models';
import { Repository } from 'typeorm';
import { PublicationEntity } from '../entities';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class PublicationRepository implements PublicationRepositoryPort {
  constructor(
    @Inject('PUBLICATIONS_REPOSITORY')
    private readonly repository: Repository<PublicationEntity>,
  ) {}

  async create(publication: Publication): Promise<Publication> {
    let entity = new PublicationEntity();
    entity.content = publication.content;
    entity.userId = publication.userId;

    entity = await this.repository.save(entity);

    publication.id = entity.id;
    publication.createdAt = entity.createdAt;
    publication.updatedAt = entity.updatedAt;

    return publication;
  }

  async delete(id: string): Promise<void> {
    const entity = this.repository.findOneBy({ id });
    if (!entity) {
      throw new Error('Publication not found');
    }
    await this.repository.delete(id);
  }

  async findById(id: string): Promise<Publication | null> {
    const instance = await this.repository.findOne({ where: { id } });

    if (instance) {
      return new Publication({
        id: instance.id,
        content: instance.content,
        userId: instance.userId,
        createdAt: instance.createdAt,
        updatedAt: instance.updatedAt,
      });
    }

    return null;
  }

  async list(page: number): Promise<ListPublications> {
    const [publications, total] = await this.repository.findAndCount({
      take: 25,
      skip: (page - 1) * 25,
      order: { createdAt: 'DESC' },
    });

    const post = publications.map((instance) => {
      return new Publication({
        id: instance.id,
        content: instance.content,
        userId: instance.userId,
        createdAt: instance.createdAt,
        updatedAt: instance.updatedAt,
      });
    });

    return new ListPublications(post, total, page, Math.ceil(total / 25));
  }

  async update(publication: Publication): Promise<Publication> {
    let entity = await this.repository.findOne({
      where: { id: publication.id },
    });

    if (!entity) {
      throw new Error('Publication not found');
    }

    entity.content = publication.content || entity.content;

    entity = await this.repository.save(entity);

    publication.updatedAt = entity.updatedAt;

    return publication;
  }
}
