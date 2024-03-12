import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// This entity is for the 'locations' or spies, the warehouses. NOT THE LOG IN USERS

@Entity()
export class Location {

    @PrimaryGeneratedColumn()
    id: number = 0;

    @Column()
    name!: string;

    @Column({length: 255})
    address!: string;

}