import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { City } from "../../entity/City"
import { Logger } from "tslog";

const log: Logger = new Logger();


export class CityController {

    static findAll = async (req: Request, res: Response) => {
    
        const cityRepository = getRepository(City);
        await cityRepository.find()
            .then(cities => {
                log.info(`Returning ${cities.length} cities`);
                res.status(200).send(cities);
            })
            .catch(e => {
                log.prettyError(e);
                res.status(500).send();
            });
    }


}