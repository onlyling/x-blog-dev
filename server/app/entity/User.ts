import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
  name: 'user',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  // 用户名
  @Column({
    type: 'varchar',
    length: 255,
  })
  user_name: string;

  // 密码
  @Column({
    type: 'varchar',
    length: 255,
  })
  password: string;

  // 性别 '0': 未知； '1': 男；'2': 女；
  @Column({
    type: 'varchar',
    length: 1,
  })
  sex: '0' | '1' | '2';

  @Column({
    type: 'int',
  })
  create_time: number;

  @Column({
    type: 'int',
  })
  update_time: number;
}
