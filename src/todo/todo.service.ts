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
    return await this.todoRepository.save(createTodoDto);
  }

  async findAll(): Promise<ReturnTodoDto[]> {
    return await this.todoRepository.find();
  }

  async findOne(id: number): Promise<ReturnTodoDto> {
    return await this.todoRepository.findOneBy({ id });
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    await this.todoRepository.update({ id }, updateTodoDto);
    return await this.todoRepository.findOneBy({ id });
  }

  async remove(id: number) {
    const entity = await this.findOne(id);

    await this.todoRepository.remove({ ...entity });
    return entity;
  }
}
