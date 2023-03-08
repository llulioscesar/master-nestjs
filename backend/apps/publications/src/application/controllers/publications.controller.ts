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
import { GetPublicationsQuery } from '../queries';

@Controller('publications')
@UseGuards(AuthGuard())
@ApiBearerAuth('jwt')
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
    const { title, content, user_id } = createPublicationDto;
    const publication = new Publication({
      title,
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
    const { id, title, content } = update;
    const publication = new Publication({
      id,
      title,
      content,
    });
    const command = new UpdatePublicationCommand(publication);
    await this.commandBus.execute<UpdatePublicationCommand, void>(command);
    return new SuccessDto(true);
  }

  @Delete('id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: SuccessDto })
  async delete(@Param('id') id: string): Promise<SuccessDto> {
    const command = new DeletePublicationCommand(id);
    await this.commandBus.execute<DeletePublicationCommand, void>(command);
    return new SuccessDto(true);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async get(@Query('page') page = 1) {
    const query = new GetPublicationsQuery(page);
    return await this.queryBus.execute<GetPublicationsQuery, ListPublications>(
      query,
    );
  }
}
