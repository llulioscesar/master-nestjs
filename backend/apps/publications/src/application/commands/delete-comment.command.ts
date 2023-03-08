import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { CommentsService } from '../services';
import { EventEmitter2 } from '@nestjs/event-emitter';

export class DeleteCommentCommand implements ICommand {
  constructor(public readonly commentId: string) {}
}

@CommandHandler(DeleteCommentCommand)
export class DeleteCommentHandler
  implements ICommandHandler<DeleteCommentCommand>
{
  constructor(
    private readonly service: CommentsService,
    private readonly eventEmmiter: EventEmitter2,
  ) {}
  async execute(command: DeleteCommentCommand) {
    const comment = await this.service.delete(command.commentId);
    this.eventEmmiter.emit('comment.deleted', comment);
  }
}
