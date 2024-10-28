import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, IsOptional } from 'class-validator';

export class UpdateTodoDto {
  @ApiProperty({ description: 'the description of the todo', example: 'description' })
  @IsString()
  @IsOptional()
  description: string;
  @ApiProperty({ description: 'the title of the todo', example: 'title' })
  @IsString()
  @IsOptional()
  title: string;
  @ApiProperty({ description: 'if the todo is closed', example: false, default: false })
  @IsBoolean()
  @IsOptional()
  closed?: boolean;
}
