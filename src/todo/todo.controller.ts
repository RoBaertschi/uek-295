import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiForbiddenResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ErrorUnauthorizedDto } from '../generic.dtos/error.unauthorized.dto';
import { ReturnTodoDto } from './dto/return-todo.dto';
import { UserInfoDto } from '../generic.dtos/userDtoAndEntity';
import { CurrentUser } from '../decorators/current-user/current-user.decorator';
import { UserService } from '../auth/user.service/user.service';

@Controller('todo')
@ApiTags('Methods')
@ApiBearerAuth()
export class TodoController {
  constructor(
    private readonly todoService: TodoService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'created user' })
  @ApiUnauthorizedResponse({ description: 'Not logged in!', type: ErrorUnauthorizedDto })
  @Post()
  async create(@Body() createTodoDto: CreateTodoDto) {
    if (typeof createTodoDto.description !== 'string') {
      throw new BadRequestException('The required field description is missing in the object!');
    }
    if (typeof createTodoDto.title !== 'string') {
      throw new BadRequestException('The required field title is missing in the object!');
    }

    return await this.todoService.create(createTodoDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    description: 'get all todos',
    type: Array<ReturnTodoDto>,
  })
  @ApiUnauthorizedResponse({ description: 'Not logged in!', type: ErrorUnauthorizedDto })
  @Get()
  async findAll() {
    return await this.todoService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    description: 'get a specific todo',
    type: ReturnTodoDto,
  })
  @ApiUnauthorizedResponse({ description: 'Not logged in!', type: ErrorUnauthorizedDto })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.todoService.findOne(+id);

    if (!result) {
      throw new NotFoundException(`We did not found a todo item with id ${id}!`);
    }
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    description: 'update the todo and get the new todo back',
    type: ReturnTodoDto,
  })
  @ApiUnauthorizedResponse({ description: 'Not logged in!', type: ErrorUnauthorizedDto })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    const result = await this.todoService.findOne(+id);
    if (!result) {
      throw new NotFoundException(`We did not found a todo item with id ${id}!`);
    }
    return await this.todoService.update(+id, updateTodoDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'deleted todo', type: ReturnTodoDto })
  @ApiUnauthorizedResponse({ description: 'Not logged in!', type: ErrorUnauthorizedDto })
  @ApiForbiddenResponse({ description: 'you need the admin role for this endpoint' })
  @Delete(':id')
  async remove(@Param('id') id: string, @CurrentUser() userInfo: UserInfoDto): Promise<ReturnTodoDto> {
    const user = await this.userService.findOne(userInfo.username);
    if (user.roles.find((role) => role === 'admin') === undefined) {
      throw new ForbiddenException('You have to be member of the role admin to call this method!');
    }

    let result = await this.todoService.findOne(+id);
    if (!result) {
      throw new NotFoundException(`We did not found a todo item with id ${id}!`);
    }
    result = await this.todoService.remove(+id);
    return result;
  }
}
