import { Router } from "express";
import AnnouncementController from "../controller/AnnouncementController";


const router = Router();

 //Get all announcements
 router.get("/", AnnouncementController.listAll);

 export default router;
