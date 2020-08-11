export interface IBaseRepository<T> {
    create(item: T): Promise<boolean>;
    update(id: string, item: T): Promise<boolean>;
    delete(id: string): Promise<boolean>;
    find(item: T): Promise<T[]>;
    getById(id: string): Promise<T>;
  }

  export abstract class BaseRepository<T> implements IBaseRepository<T> {
      create(item: T): Promise<boolean> {
          throw new Error("Method not implemented.");
      }
      update(id: string, item: T): Promise<boolean> {
          throw new Error("Method not implemented.");
      }
      delete(id: string): Promise<boolean> {
          throw new Error("Method not implemented.");
      }
      find(item: T): Promise<T[]> {
          throw new Error("Method not implemented.");
      }
      getById(id: string): Promise<T> {
          throw new Error("Method not implemented.");
      }


  }
  