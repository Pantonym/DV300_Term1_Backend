import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Recipe {

    @PrimaryGeneratedColumn()
    id: number = 0

    @Column()
    name!: string;

    @Column({length: 255})
    description!: string;

    @Column()
    amountCrafted!: number; // how many of this entity will be crafted/placed into your inventory when the recipe is used

    @Column("int", { array: true })
    ingredientsNeeded!: number[];

}