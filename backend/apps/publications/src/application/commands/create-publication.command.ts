import { EventEmitter2 } from '@nestjs/event-emitter';
import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { Publication } from '../../domain/models';
import { PublicationsService } from '../services';

export class CreatePublicationCommand implements ICommand {
  constructor(public readonly publication: Publication) {}
}

@CommandHandler(CreatePublicationCommand)
export class CreatePublicationHandler
  implements ICommandHandler<CreatePublicationCommand>
{
  constructor(
    private readonly service: PublicationsService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(command: CreatePublicationCommand): Promise<void> {
    const { publication } = command;

    const savedProfile = await this.service.create(publication);
    publication.id = savedProfile.id;

    this.eventEmitter.emit('publication.created', publication);
  }
}
