
export interface IAnnoucement {
    id?: number;
    externalId?: string;
    url?: string;
    publishedAt?: Date;
    description?: string;
    document_url?: string;
    createdAt?: Date;
    updatedAt?: Date;
    
  }
  
  export class Annoucement implements IAnnoucement {
    constructor(
        public id?: number, 
        public externalId?: string, 
        public url?: string,
        public publishedAt?: Date,
        public description?: string,
        public document_url?: string,
        public createdAt?: Date,
        public updatedAt?: Date
        ) {
          this.createdAt = new Date();
          this.updatedAt = this.createdAt;
        }
  }