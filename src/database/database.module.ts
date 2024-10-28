import { Module, Provider } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Todo } from '../todo/entities/todo.entity';

export const DATA_SOURCE = 'DATA_SOURCE';
export const TODO_REPOSITORY = 'TODO_REPOSITORY';

export const databaseProviders: Provider[] = [
  {
    provide: DATA_SOURCE,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'better-sqlite3',
        database: 'todo.sqlite',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
  {
    provide: TODO_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Todo),
    inject: [DATA_SOURCE],
  },
];

@Module({ providers: [...databaseProviders], exports: [...databaseProviders] })
export class DatabaseModule {}
