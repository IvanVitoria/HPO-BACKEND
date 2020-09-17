import "reflect-metadata";
import {createConnection} from "typeorm";
import express = require('express');
import * as bodyParser from "body-parser";
import {HPO} from "./service/hpo.service";
import routes from "./api/route";



const PORT = 3000;


createConnection().then(async connection => {
    const app: express.Application = express();
    app.use(bodyParser.json());
    app.use("/", routes);

    app.listen(PORT, function () {
      console.log('Example app listening on port 3000!');
    });    

    /*console.log('Start crawling');
    const hpo : HPO = new HPO();
    await hpo.startCrawling();*/

}).catch(error => console.log(error));
