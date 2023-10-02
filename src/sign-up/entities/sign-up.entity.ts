import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity()
export class SignUpEntity {

  @ObjectIdColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;
}
