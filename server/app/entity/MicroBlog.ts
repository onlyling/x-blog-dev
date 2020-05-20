import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
  name: 'micro_blog',
})
export class MicroBlog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  content: string;

  @Column({
    default: 0,
  })
  view_count: number;

  @Column()
  image: string;

  @Column('int')
  create_time: number;

  @Column('int')
  update_time: number;
}
