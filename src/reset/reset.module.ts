import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from '../midleware/logger.middleware';
import { ResetController } from './reset.controller/reset.controller';
import { ResetService } from './reset.service/reset.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  controllers: [ResetController],
  providers: [ResetService],
  exports: [ResetService],
  imports: [DatabaseModule],
})
export class ResetModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(ResetController);
  }
}
