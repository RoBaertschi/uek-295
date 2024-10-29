import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';
import { DatabaseModule } from '../database/database.module';
import { CreateTodoDto } from './dto/create-todo.dto';
import { ResetModule } from '../reset/reset.module';
import { ResetService } from '../reset/reset.service/reset.service';
import { afterEach } from 'node:test';

describe('TodoService', () => {
  let service: TodoService;
  let reset: ResetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodoService],
      imports: [DatabaseModule, ResetModule],
    }).compile();

    service = module.get<TodoService>(TodoService);
    reset = module.get<ResetService>(ResetService);
    await reset.resetTable(0, 'todo');
  });

  afterEach(async () => {
    await reset.resetTable(0, 'todo');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // This test is for both findOne and create
  it('should create a new todo item and find the new todo item', async () => {
    const create: CreateTodoDto = { title: 'title', description: 'description' };
    const result = await service.create(create);
    expect(result).toEqual(create);
    expect(await service.findOne(result.id)).toEqual(result);
  });

  it('should find all and none', async () => {
    await reset.resetTable(0, 'todo');
    await expect(service.findAll()).resolves.toEqual([]);
    const create: CreateTodoDto = { title: 'title', description: 'description' };
    const result = await service.create(create);
    await expect(service.findAll()).resolves.toEqual([result]);
  });

  it('should update correctly', async () => {
    const create: CreateTodoDto = { title: 'title', description: 'description' };
    const result = await service.create(create);
    await expect(service.update(result.id, { closed: true })).resolves.toEqual({ ...result, closed: true });
  });

  it('should remove todo', async () => {
    const create: CreateTodoDto = { title: 'title', description: 'description' };
    const result = await service.create(create);
    await expect(service.remove(result.id)).resolves.toEqual(result);
    await expect(service.findOne(result.id)).resolves.toEqual(null);
  });
});
