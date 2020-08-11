import "reflect-metadata";
import {createConnection} from "typeorm";
import express = require('express');
import {Announcement} from "./entity/Announcement";
import {getRepository} from "typeorm";



createConnection().then(async connection => {

    console.log("Inserting a new Annoucement into the database...");
    const announcement = new Announcement();
    announcement.externalId = '123456';
    announcement.description = 'Description';
    announcement.documentUrl = 'https://announcement.com/123456/document.pdf';
    announcement.url = 'https://announcement.com/123456'; 
    announcement.publishedAt = new Date();
    announcement.createdAt = new Date();
    announcement.updatedAt = new Date();

    const annoucementRepository = getRepository(Announcement);
    await annoucementRepository.save(announcement);
    //await connection.manager.save(annoucement);
    console.log("Saved a new Announcement with id: " + announcement.id);

    console.log("Loading Announcement from the database...");
    //const annoucements = await connection.manager.find(annoucement);
    const annoucementFromDB = await annoucementRepository.findOne(announcement.id);
    console.log("Loaded annoucement: ", annoucementFromDB);
    
    const app: express.Application = express();
    app.get('/', function (req, res) {
      res.send('Hello World!');
    });
    app.listen(3000, function () {
      console.log('Example app listening on port 3000!');
    });    

}).catch(error => console.log(error));
