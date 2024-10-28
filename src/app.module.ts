import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { LoggerMiddleware } from './midleware/logger.middleware';
import { AuthModule } from './auth/auth.module';
import { TodoModule } from './todo/todo.module';
import { DatabaseModule } from './database/database.module';
import { ResetModule } from './reset/reset.module';

@Module({
  imports: [AuthModule, TodoModule, DatabaseModule, ResetModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes();
  }
}
