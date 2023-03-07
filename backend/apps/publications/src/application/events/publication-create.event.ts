import { Publication } from '../../domain/models';
import { OnEvent } from '@nestjs/event-emitter';

export class PublicationCreateEvent {
  constructor(public readonly publication: Publication) {}
}

export class PublicationCreateListener {
  @OnEvent('publication.created', { async: true })
  handlePublicationCreatedEvent(
    event: PublicationCreateEvent,
    callback?: (data: Publication) => void,
  ) {
    if (callback) {
      callback(event.publication);
    }
  }
}
