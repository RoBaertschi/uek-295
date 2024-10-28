import { CreateTodoDto } from './create-todo.dto';

export class ReturnTodoDto extends CreateTodoDto {
  id: number;
  closed: boolean;
}
