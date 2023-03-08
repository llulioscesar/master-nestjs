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
import { CountCommentsPublicationsQuery, GetCommentsQuery } from '../queries';
import { Comment } from '../../domain/models';
import { CreateCommentCommand, DeleteCommentCommand } from '../commands';
import {
  CommentDto,
  CountCommentsPublicationsDto,
  CreateCommentDto,
  SuccessDto,
} from '../dtos';
import { convertKeysToSnakeCase } from '../../../../../shared/util';

@Controller('comments')
@UseGuards(AuthGuard())
@ApiBearerAuth()
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
    const { user_id, parent_id, publication_id, content } = body;

    const comment = new Comment({
      userId: user_id,
      publicationId: publication_id,
      content: content,
    });

    if (parent_id) {
      comment.parent = new Comment({ id: parent_id });
    }

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
  ): Promise<CommentDto[]> {
    const query = new GetCommentsQuery(publicationId);
    const result = await this.queryBus.execute<GetCommentsQuery, Comment[]>(
      query,
    );
    return convertKeysToSnakeCase(result);
  }

  @Post('publication/count')
  @ApiBody({
    type: [String],
    description: 'Get count comments for publications',
  })
  @ApiResponse({ status: HttpStatus.OK, type: [CountCommentsPublicationsDto] })
  async getCommentsCountForPublicationIds(
    @Body() publicationIds: string[],
  ): Promise<CountCommentsPublicationsDto[]> {
    const query = new CountCommentsPublicationsQuery(publicationIds);
    const counts = await this.queryBus.execute<
      CountCommentsPublicationsQuery,
      Comment[]
    >(query);

    return counts.map((count) => {
      const c = new CountCommentsPublicationsDto();
      c.publication_id = count.publicationId;
      c.count = count.countsPublications;
      return c;
    });
  }
}
