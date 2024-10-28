import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty({ description: 'the description of the todo', example: 'description' })
  @IsString()
  description: string;
  @ApiProperty({ description: 'the title of the todo', example: 'title' })
  @IsString()
  title: string;
}
