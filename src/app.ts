import "reflect-metadata";
import {createConnection} from "typeorm";
import express = require('express');
import * as bodyParser from "body-parser";
import {HPO} from "./service/hpo.service";
import routes from "./api/route";
import {schedule} from "node-cron"



const PORT = 3000;


createConnection().then(async connection => {
    const app: express.Application = express();
    app.use(bodyParser.json());
    app.use("/", routes);

    app.listen(PORT, function () {
      console.log(`Server is up and listening on port ${PORT}`);

      const task = schedule('0 19 * * *', () => { // every day at 19:00
        startCrawling();
      }, {
        timezone: "Europe/Madrid"
      });

      startCrawling(); // frist time
    });    

    

}).catch(error => console.log(error));

function startCrawling() {
  console.log('Start crawling');
  
  const hpo : HPO = new HPO();
  hpo.startCrawling()
    .then(() => console.log('End crawling'))
    .catch(e => console.error(e));

}
