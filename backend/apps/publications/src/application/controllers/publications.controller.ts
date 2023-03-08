import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePublicationDto, SuccessDto } from '../dtos';
import { Publication } from '../../domain/models';
import { CreatePublicationCommand } from '../commands';

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
}
