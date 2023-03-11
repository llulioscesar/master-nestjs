import { ListPublications, Publication } from '../models';

export abstract class PublicationsService {
  abstract get(page: number): Promise<ListPublications>;
  abstract getById(id: string): Promise<Publication>;
  abstract create(publication: Publication): Promise<Publication>;
  abstract update(publication: Publication): Promise<Publication>;
  abstract delete(id: string): Promise<void>;
}
