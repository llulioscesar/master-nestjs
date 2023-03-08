import { Publication } from './publication.model';

export class ListPublications {
  publications: Publication[];
  total: number;
  page: number;
  lastPage: number;

  constructor(
    publications: Publication[],
    total: number,
    page: number,
    lastPage: number,
  ) {
    this.publications = publications;
    this.total = total;
    this.page = page;
    this.lastPage = lastPage;
  }
}
