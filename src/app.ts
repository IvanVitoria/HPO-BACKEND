import "reflect-metadata";
import {createConnection} from "typeorm";
import express = require('express');
import cors from "cors";
import * as bodyParser from "body-parser";
import {HpoService} from "./service/HpoService";
import routes from "./api/route";
import {schedule} from "node-cron"
import { Logger } from "tslog";

require('dotenv').config();


const log: Logger = new Logger();
const PORT = process.env.API_PORT;

createConnection().then(async connection => {
    const app: express.Application = express();
    app.use(cors());
    app.use(bodyParser.json());
    app.use("/", routes);
    


    app.listen(PORT, function () {
      log.info(`Server is up and listening on port ${PORT}`);

      const task = schedule('0 19 * * *', () => { // every day at 19:00
        startCrawling();
      }, {
        timezone: "Europe/Madrid"
      });

      startCrawling(); // frist time
    });    

    

}).catch(error => console.log(error));

function startCrawling() {
  log.info('Start crawling');
  
  const hpo : HpoService = new HpoService();
  hpo.startCrawling()
    .then(() => log.info('End crawling'))
    .catch(e => log.error(e));

}
