import { Router, Request, Response } from "express";
import announcement from "./announcement";
import city from "./city";

const routes = Router();

routes.use("/announcements", announcement);
routes.use("/cities", city);

export default routes;