import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Ingredients {

    @PrimaryGeneratedColumn()
    id: number = 0;

    @Column()
    name!: string;

    @Column({length: 255})
    description!: string;

    @Column()
    image!: string;

}