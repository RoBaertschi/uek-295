import { CreateTodoDto } from './create-todo.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ReturnTodoDto extends CreateTodoDto {
  @ApiProperty({ description: 'the id of the todo', example: 1, minimum: 1 })
  id: number;
  @ApiProperty({ description: 'if the todo is closed', example: false, default: false })
  closed: boolean;
}
