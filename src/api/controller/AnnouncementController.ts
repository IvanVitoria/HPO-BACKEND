import { Request, Response } from "express";
import { getRepository } from "typeorm";

import { Announcement } from "../../entity/Announcement";


class AnnouncementController {

    static listAll = async (req: Request, res: Response) => {
        //Get announcements from database
        const announcementRepository = getRepository(Announcement);
        const announcements = await announcementRepository.find();
      
        //Send the users object
        res.send(announcements);
      };    

}

export default AnnouncementController;
