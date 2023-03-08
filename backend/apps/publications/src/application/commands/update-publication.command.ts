import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { Publication } from '../../domain/models';
import { PublicationsService } from '../services';
import { EventEmitter2 } from '@nestjs/event-emitter';

export class UpdatePublicationCommand implements ICommand {
  constructor(public readonly publication: Publication) {}
}

@CommandHandler(UpdatePublicationCommand)
export class UpdatePublicationHandler
  implements ICommandHandler<UpdatePublicationCommand>
{
  constructor(
    private readonly service: PublicationsService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(command: UpdatePublicationCommand): Promise<void> {
    const { publication } = command;

    const savePublication = await this.service.update(publication);

    publication.updatedAt = savePublication.updatedAt;

    this.eventEmitter.emit('publication.updated', publication);
  }
}
