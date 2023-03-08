import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { Comment } from '../../domain/models';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CommentsService } from '../services';

export class CreateCommentCommand implements ICommand {
  constructor(public readonly comment: Comment) {}
}

@CommandHandler(CreateCommentCommand)
export class CreateCommentHandler
  implements ICommandHandler<CreateCommentCommand>
{
  constructor(
    private readonly service: CommentsService,
    private readonly eventEmmiter: EventEmitter2,
  ) {}

  async execute(command: CreateCommentCommand): Promise<void> {
    const { comment } = command;

    const savedComment = await this.service.create(comment);

    comment.createdAt = savedComment.createdAt;
    comment.updatedAt = savedComment.updatedAt;
    comment.id = savedComment.id;

    this.eventEmmiter.emit('comment.created', comment);
  }
}
