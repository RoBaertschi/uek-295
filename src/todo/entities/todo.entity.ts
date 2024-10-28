import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;
  @Column()
  title: string;
  @Column({ default: false })
  closed: boolean;
}
