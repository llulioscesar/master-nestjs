import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CreatePublicationDto,
  ListPublicationsDto,
  PublicationDto,
  SuccessDto,
  UpdatePublicationDto,
} from '../dtos';
import { ListPublications, Publication } from '../../domain/models';
import {
  CreatePublicationCommand,
  DeletePublicationCommand,
  UpdatePublicationCommand,
} from '../commands';
import { GetPublicationQuery, GetPublicationsQuery } from '../queries';

@Controller('publications')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@ApiTags('Publications')
export class PublicationsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: CreatePublicationDto, description: 'Create Publication' })
  @ApiResponse({ status: HttpStatus.CREATED, type: SuccessDto })
  async create(
    @Body() createPublicationDto: CreatePublicationDto,
  ): Promise<SuccessDto> {
    const { content, user_id } = createPublicationDto;
    const publication = new Publication({
      content,
      userId: user_id,
    });
    const command = new CreatePublicationCommand(publication);
    await this.commandBus.execute<CreatePublicationCommand, void>(command);
    return new SuccessDto(true);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: SuccessDto })
  @ApiBody({ type: UpdatePublicationDto, description: 'Update Publication' })
  async update(@Body() update: UpdatePublicationDto) {
    const { id, content } = update;
    const publication = new Publication({
      id,
      content,
    });
    const command = new UpdatePublicationCommand(publication);
    await this.commandBus.execute<UpdatePublicationCommand, void>(command);
    return new SuccessDto(true);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: SuccessDto })
  async delete(@Param('id') id: string): Promise<SuccessDto> {
    const command = new DeletePublicationCommand(id);
    await this.commandBus.execute<DeletePublicationCommand, void>(command);
    return new SuccessDto(true);
  }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: ListPublicationsDto })
  @HttpCode(HttpStatus.OK)
  async get(@Query('page') page = '1') {
    const query = new GetPublicationsQuery(parseInt(page, 10));
    const publications = await this.queryBus.execute<
      GetPublicationsQuery,
      ListPublications
    >(query);

    const dtos = publications.publications.map((publication) => {
      const post = new PublicationDto();
      post.id = publication.id;
      post.content = publication.content;
      post.user_id = publication.userId;
      post.created_at = publication.createdAt.toISOString();
      post.updated_at = publication.updatedAt.toISOString();
      return post;
    });

    const result = new ListPublicationsDto();
    result.page = publications.page;
    result.total = publications.total;
    result.publications = dtos;
    result.last_page = publications.lastPage;
    return result;
  }

  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, type: PublicationDto })
  @HttpCode(HttpStatus.OK)
  async getOne(@Param('id') id: string) {
    const query = new GetPublicationQuery(id);
    const publication = await this.queryBus.execute<
      GetPublicationQuery,
      Publication
    >(query);
    const dto = new PublicationDto();
    dto.id = publication.id;
    dto.content = publication.content;
    dto.user_id = publication.userId;
    dto.created_at = publication.createdAt.toISOString();
    dto.updated_at = publication.updatedAt.toISOString();
    return dto;
  }
}
