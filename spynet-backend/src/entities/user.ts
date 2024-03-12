import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
// this is the entity that handles the logging in admin type of user
@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number = 0;

    @Column()
    username!: string;

    @Column()
    isAdmin: Boolean = false;

}