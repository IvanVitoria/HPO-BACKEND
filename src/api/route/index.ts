import { Router, Request, Response } from "express";
import announcement from "./announcement";

const routes = Router();

routes.use("/announcements", announcement);

export default routes;