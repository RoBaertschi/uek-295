import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [TodoController],
  providers: [TodoService],
  imports: [DatabaseModule, AuthModule],
})
export class TodoModule {}
