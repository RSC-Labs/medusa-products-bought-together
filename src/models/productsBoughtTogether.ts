import { BaseEntity, Product, generateEntityId } from "@medusajs/medusa"
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column, BeforeInsert } from 'typeorm';

@Entity()
export class ProductsBoughtTogether extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;
  
    @ManyToOne(() => Product, { eager: true })
    @JoinColumn({ name: 'product_id' })
    product: Product;
  
    @ManyToOne(() => Product, { eager: true })
    @JoinColumn({ name: 'bought_together_product_id' })
    boughtTogetherProduct: Product;
  
    @Column()
    frequency: number;

    /**
     * @apiIgnore
     */
    @BeforeInsert()
    private beforeInsert(): void {
        this.id = generateEntityId(this.id, "obt")
    }
}
