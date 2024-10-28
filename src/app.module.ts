import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { LoggerMiddleware } from './midleware/logger.middleware';
import { AuthModule } from './auth/auth.module';
import { TodoModule } from './todo/todo.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [AuthModule, TodoModule, DatabaseModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes();
  }
}
