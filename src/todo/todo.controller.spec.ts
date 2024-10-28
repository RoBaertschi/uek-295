import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';
import { ResetModule } from '../reset/reset.module';
import { ResetService } from '../reset/reset.service/reset.service';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { CreateTodoDto } from './dto/create-todo.dto';
import { BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';

describe('TodoController', () => {
  let controller: TodoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [TodoService],
      imports: [DatabaseModule, AuthModule, ResetModule],
    }).compile();

    controller = module.get<TodoController>(TodoController);
    const reset = module.get<ResetService>(ResetService);
    await reset.resetTable(0, 'todo');
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should find nothing', async () => {
    expect(await controller.findAll()).toEqual([]);
  });

  it('should create something', async () => {
    const created = { title: 'hello', description: 'world' };
    expect(await controller.create(created)).toEqual(created);

    await expect(controller.create({} as CreateTodoDto)).rejects.toThrow(
      new BadRequestException('The required field description is missing in the object!'),
    );
    await expect(controller.create({ description: 'd' } as CreateTodoDto)).rejects.toThrow(
      new BadRequestException('The required field title is missing in the object!'),
    );
    await expect(controller.create({ description: 23 } as unknown as CreateTodoDto)).rejects.toThrow(
      new BadRequestException('The required field description is missing in the object!'),
    );
    await expect(controller.create({ title: 22 } as unknown as CreateTodoDto)).rejects.toThrow(
      new BadRequestException('The required field description is missing in the object!'),
    );
  });

  it('should find a created new one', async () => {
    await expect(controller.findOne(-1 + '')).rejects.toThrow(
      new NotFoundException('We did not found a todo item with id -1!'),
    );

    const created = { title: 'hello', description: 'world' };
    const result = await controller.create(created);
    expect(await controller.findOne(result.id + '')).toEqual(result);
  });
  it('should update a created new one', async () => {
    const created = { title: 'hello', description: 'world' };
    const result = await controller.create(created);
    const updated: UpdateTodoDto = { closed: true };
    expect(await controller.update(result.id + '', updated)).toEqual({ ...result, ...updated });
    await expect(controller.update('-1', updated)).rejects.toThrow(
      new NotFoundException('We did not found a todo item with id -1!'),
    );
  });

  it('should delete a created new one', async () => {
    const created = { title: 'hello', description: 'world' };
    const result = await controller.create(created);
    expect(await controller.remove(result.id + '', { userId: 1, username: 'admin' })).toEqual(result);

    await expect(controller.remove(result.id + '', { userId: 1, username: 'user' })).rejects.toThrow(
      new ForbiddenException('You have to be member of the role admin to call this method!'),
    );
    await expect(controller.remove('-1', { userId: 1, username: 'admin' })).rejects.toThrow(
      new NotFoundException(`We did not found a todo item with id -1!`),
    );
  });
});
