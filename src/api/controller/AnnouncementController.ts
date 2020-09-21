import { Request, Response } from "express";
import { Brackets, getRepository, ObjectLiteral } from "typeorm";

import { Announcement } from "../../entity/Announcement";

export class AnnouncementController {

  static readonly DEFAULT_PAST_DAYS : number = 90;
  

    static findAll = async (req: Request, res: Response) => {
  
      const announcementRepository = getRepository(Announcement);
      let publishedAfter : Date; 

      if(req.query.published) {
        publishedAfter = new Date(<string>req.query.published);
      } else {
        publishedAfter = new Date();
        publishedAfter.setDate(publishedAfter.getDate() - AnnouncementController.DEFAULT_PAST_DAYS);
      }      
           
      let cities;
      if(req.query.cities) {
        cities = (<string>req.query.cities).split(',');
      }
      
      console.info(`Filtering announcements by cities?: ${cities} and publishedAfter: ${publishedAfter}`);

      let builder = announcementRepository
        .createQueryBuilder("announcement")
        .where("announcement.publishedAt >= :publishedAt", {publishedAt: publishedAfter});
      
      if(cities) {
        const arrayCities : string[] = cities;
          builder = builder.andWhere(new Brackets(qb => {
            for(let ind = 0; ind < arrayCities.length; ind++) {
              const city = arrayCities[ind].trim().toLowerCase();
              const cityKey = 'city' + ind;
              const whereString = "LOWER(announcement.description) LIKE :city" + ind;              
              var whereValue: ObjectLiteral = {
                cityKey: `%${city}%`
              }

              whereValue[cityKey] = `%${city}%`;
              //console.log(`[${cityKey}] = ${whereValue[cityKey]}`);

              if(ind == 0) {
                qb = qb.where(whereString, whereValue);
              } else {
                qb = qb.orWhere(whereString, whereValue)
              }
            }
          }));
      }

      builder.orderBy("announcement.publishedAt", "DESC");

      console.log(`\n SQL: \n ${builder.getSql()} \n`);
      
      await builder.getMany()
        .then(a => {
          console.log(`Returning ${a.length} announcements`);
          res.status(200).send(a);
        })
        .catch(e => {
          console.error(e);
          res.status(500).send();
        });
   }
}
