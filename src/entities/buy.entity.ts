import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  ManyToOne,
  JoinTable,
} from 'typeorm'
import { Product } from './product.entity'
import { User } from './user.entity'

@Entity()
export class Buy {
  @PrimaryGeneratedColumn('increment')
  readonly id: number

  @ManyToOne((type) => User, (user) => user.buys, {
    onDelete: "CASCADE"
  })
  user: User

  @ManyToMany((type) => Product, {
    eager: true,
  })
  @JoinTable()
  products: Product[]

  @Column({ type: 'float' })
  total: number
}
