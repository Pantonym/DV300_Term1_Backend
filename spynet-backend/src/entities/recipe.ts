import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Recipe {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    description!: string;

    @Column()
    amountCrafted!: number; // how many of this entity will be crafted/placed into your inventory when the recipe is used

    @Column()
    ingredientsNeeded!: Array<Number>;

}