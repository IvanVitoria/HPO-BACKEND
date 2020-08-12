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
export class Announcement {
    
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column()
    externalId!: string;
    
    @Column()
    url!: string;
    
    @Column()
    publishedAt!: Date;
    
    @Column()
    description!: string;
    
    @Column()
    documentUrl!: string;
    
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