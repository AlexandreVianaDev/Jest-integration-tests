import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  BeforeInsert,
} from "typeorm";
import { Buy } from "./buy.entity";
import { Cart } from "./cart.entity";
import { hash } from "bcryptjs";

@Entity()
export class User {
  @PrimaryGeneratedColumn("increment")
  readonly id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  email: string;

  @Column()
  password: string;

  @OneToMany((type) => Buy, (buy) => buy.user, {
    eager: true,
  })
  buys: Buy[];

  @OneToOne((type) => Cart, {
    eager: true,
  })
  @JoinColumn()
  cart: Cart;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}
