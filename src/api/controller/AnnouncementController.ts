import { Request, Response } from "express";
import { getRepository } from "typeorm";

import { Announcement } from "../../entity/Announcement";


export class AnnouncementController {
  

    static findAll = async (req: Request, res: Response) => {
  
      const announcementRepository = getRepository(Announcement);
      let announcements : Announcement[];

      if(req.query.cities) {
        const cities = (<string>req.query.cities).split(',');
        
        console.info(`Filtering announcements by cities: ${cities}`);

        const builder = announcementRepository.createQueryBuilder("announcement");

        for(let ind = 0; ind < cities.length; ind++) {
          const city = cities[ind].toLowerCase();
          const whereString = "LOWER(announcement.description) LIKE :city";
          const whereValue = { city: `%${city}%` };
          if(ind == 0) {
            builder.where(whereString, whereValue);
          } else {
            builder.orWhere(whereString, whereValue)
          }
        }
        
        announcements = await builder.getMany();
      } else {
        announcements = await announcementRepository.find();
      }

       //Send the users object
       res.send(announcements);
   }
}
