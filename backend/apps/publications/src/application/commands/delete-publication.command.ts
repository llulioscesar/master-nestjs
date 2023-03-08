import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { PublicationsService } from '../services';
import { EventEmitter2 } from '@nestjs/event-emitter';

export class DeletePublicationCommand implements ICommand {
  constructor(public readonly id: string) {}
}

@CommandHandler(DeletePublicationCommand)
export class DeletePublicationHandler
  implements ICommandHandler<DeletePublicationCommand>
{
  constructor(
    private readonly service: PublicationsService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(command: DeletePublicationCommand): Promise<void> {
    const { id } = command;

    await this.service.delete(id);

    this.eventEmitter.emit('publication.deleted', id);
  }
}
