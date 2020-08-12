import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Announcement {
    
    @PrimaryGeneratedColumn()
    id?: number;
    
    @Column()
    externalId?: string;
    
    @Column()
    url?: string;
    
    @Column()
    publishedAt?: Date;
    
    @Column()
    description?: string;
    
    @Column()
    documentUrl?: string;
    
    @Column()
    createdAt?: Date;
    
    @Column()
    updatedAt?: Date;
}