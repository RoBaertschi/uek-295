import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
  @ApiProperty({ description: 'the description of the todo', example: 'description' })
  description: string;
  @ApiProperty({ description: 'the title of the todo', example: 'title' })
  title: string;
}
