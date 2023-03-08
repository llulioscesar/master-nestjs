import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetCommentsQuery } from '../queries';
import { Comment } from '../../domain/models';
import { CreateCommentCommand, DeleteCommentCommand } from '../commands';
import { CommentDto, CreateCommentDto, SuccessDto } from '../dtos';

@Controller('comments')
@UseGuards(AuthGuard())
@ApiBearerAuth('jwt')
@ApiTags('Comments')
export class CommentsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiBody({ type: CreateCommentDto, description: 'Create Comment' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: SuccessDto,
    description: 'Comment created',
  })
  async create(@Body() body: CreateCommentDto): Promise<SuccessDto> {
    const comment = new Comment(body);

    const command = new CreateCommentCommand(comment);
    await this.commandBus.execute<CreateCommentCommand, void>(command);
    return new SuccessDto(true);
  }

  @Delete(':id')
  @ApiBody({ type: CreateCommentDto, description: 'Delete Comment' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SuccessDto,
    description: 'Comment deleted',
  })
  async delete(@Param('id') id: string): Promise<SuccessDto> {
    const command = new DeleteCommentCommand(id);
    await this.commandBus.execute<DeleteCommentCommand, void>(command);
    return new SuccessDto(true);
  }

  @Get('publication/:publicationId')
  @ApiResponse({ status: HttpStatus.OK, type: [CommentDto] })
  async getCommentsForPublicationId(
    @Param('publicationId') publicationId: string,
  ): Promise<Comment[]> {
    const query = new GetCommentsQuery(publicationId);
    return await this.queryBus.execute<GetCommentsQuery, Comment[]>(query);
  }
}
