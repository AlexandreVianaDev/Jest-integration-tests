import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Product {
  @PrimaryGeneratedColumn('increment')
  readonly id: number

  @Column()
  name: string

  @Column()
  description: string

  @Column({ type: 'float' })
  price: number
}
