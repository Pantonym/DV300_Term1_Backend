import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Ingredients {

    @PrimaryGeneratedColumn()
    id: number = 0;

    @Column()
    name!: string;

    @Column({ default: 0 })
    totalWarehouse1!: number; 

    @Column({ default: 0 })
    totalWarehouse2: number = 0; 

    @Column({ default: 0 })
    totalWarehouse3!: number; 

    @Column({ default: 0 })
    totalAmount!: number;

    @Column({length: 255})
    description!: string;

    @Column()
    image!: string;

}