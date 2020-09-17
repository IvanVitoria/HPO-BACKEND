import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    CreateDateColumn,
    UpdateDateColumn,
    BeforeInsert,
    BeforeUpdate
  } from "typeorm";

@Entity()
@Unique(["externalId"])
export class City {

    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column()
    externalId!: string;

    @Column()
    ineCode!: string;
    
    @Column()
    name!: string;
    
    @Column()
    shortName!: string;
    
    @Column()
    @CreateDateColumn()
    createdAt!: Date;
    
    @Column()
    @UpdateDateColumn()
    updatedAt!: Date;

    @BeforeInsert()
    beforeInsert() {
        this.createdAt = this.updatedAt = new Date();
    }

    @BeforeUpdate()
    beforeUpdate() {
        this.updatedAt = new Date();
    }
}