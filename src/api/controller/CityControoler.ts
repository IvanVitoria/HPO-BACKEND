import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { City } from "../../entity/City"


export class CityController {

    static findAll = async (req: Request, res: Response) => {
    
        const cityRepository = getRepository(City);
        const cities = await cityRepository.find();

        res.send(cities);
    }


}