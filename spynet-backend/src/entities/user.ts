import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';

// this is the entity that handles the logging in admin type of user
@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number = 0;

    @Column()
    email: string = "email@email.com";

    @Column()
    password!: string;

    @Column()
    isAdmin: Boolean = false;

    @BeforeInsert()
    async hashPassword(): Promise<void> {
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
    }

}