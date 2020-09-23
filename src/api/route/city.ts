import { Router } from "express";
import { CityController}  from "../controller/CityController";


const router = Router();

 //Get all cities
 router.get("/", CityController.findAll);

 export default router;
