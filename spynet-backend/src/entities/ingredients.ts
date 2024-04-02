import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Ingredients {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({default: 'Decrypting name...'})
    name!: string;

    @Column({ default: 0 })
    totalWarehouse1!: number; 

    @Column({ default: 0 })
    totalWarehouse2!: number; 

    @Column({ default: 0 })
    totalWarehouse3!: number; 

    @Column({ default: 0 })
    totalAmount!: number;

    @Column({length: 255, default: 'Decrypting description...'})
    description!: string;

    @Column({ default: "../../../assets/ingredients/loadingItem.png" })
    image!: string;

}