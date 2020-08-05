
export interface IAnnoucement {
    id?: number;
    externalId?: string;
    publishedAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
    
  }
  
  export class Annoucement implements IAnnoucement {
    constructor(
        public id?: number, 
        public externalId?: string, 
        public publishedAt?: Date,
        public createdAt?: Date,
        public updatedAt?: Date
        ) {}
  }