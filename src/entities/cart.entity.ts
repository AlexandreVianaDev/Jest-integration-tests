import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Product } from './product.entity'

@Entity()
export class Cart {
  @PrimaryGeneratedColumn('increment')
  readonly id: number

  @Column('float')
  subtotal: number

  @ManyToMany((type) => Product, {
    eager: true,
  })
  @JoinTable()
  products: Product[]
}
