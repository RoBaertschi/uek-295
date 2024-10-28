import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ErrorUnauthorizedDto } from '../../old/sample/generic.dtos/error.unauthorized.dto';
import { ReturnTodoDto } from './dto/return-todo.dto';

@Controller('todo')
@ApiTags('Methods')
@ApiBearerAuth()
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ description: 'created user' })
  @ApiUnauthorizedResponse({ description: 'Not logged in!', type: ErrorUnauthorizedDto })
  @Post()
  async create(@Body() createTodoDto: CreateTodoDto) {
    await this.todoService.create(createTodoDto);
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
    return await this.todoService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    description: 'update the todo and get the new todo back',
    type: ReturnTodoDto,
  })
  @ApiUnauthorizedResponse({ description: 'Not logged in!', type: ErrorUnauthorizedDto })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return await this.todoService.update(+id, updateTodoDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiNoContentResponse({ description: 'deleted todo' })
  @ApiUnauthorizedResponse({ description: 'Not logged in!', type: ErrorUnauthorizedDto })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.todoService.remove(+id);
  }
}
