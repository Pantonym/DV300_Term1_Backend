import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Ingredients {

    @PrimaryGeneratedColumn()
    id: number = 0;

    @Column()
    name!: string;

    @Column()
    totalWarehouse1!: number; 

    @Column()
    totalWarehouse2!: number; 

    @Column()
    totalWarehouse3!: number; 

    @Column()
    totalAmount!: number;

    @Column({length: 255})
    description!: string;

    @Column()
    image!: string;

}