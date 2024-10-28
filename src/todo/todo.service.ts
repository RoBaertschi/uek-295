import { Inject, Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ReturnTodoDto } from './dto/return-todo.dto';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { TODO_REPOSITORY } from '../database/database.module';

@Injectable()
export class TodoService {
  constructor(
    @Inject(TODO_REPOSITORY)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async create(createTodoDto: CreateTodoDto) {
    await this.todoRepository.save(createTodoDto);
  }

  async findAll(): Promise<ReturnTodoDto[]> {
    return await this.todoRepository.find();
  }

  async findOne(id: number): Promise<ReturnTodoDto> {
    return await this.todoRepository.findOneBy({ id });
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    return await this.todoRepository.update({ id }, updateTodoDto);
  }

  async remove(id: number) {
    await this.todoRepository.delete({ id });
  }
}
