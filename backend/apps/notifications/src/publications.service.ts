import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
  PublicationsServiceClient,
  GetByIdResponse,
} from '../../../proto/publications/publications.pb';
import { Observable } from 'rxjs';

@Injectable()
export class PublicationsService implements OnModuleInit {
  private service: PublicationsServiceClient;

  constructor(
    @Inject('PUBLICATIONS_SERVICE')
    private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.service = this.client.getService<PublicationsServiceClient>(
      'PublicationsService',
    );
  }

  getPubicationById(id: string): Observable<GetByIdResponse> {
    return this.service.getById({ id });
  }
}
