import { Crawler } from "./crawler.service";
import { Annoucement } from "../model/announcement.model";

export class HPO {


}


 (async () => {

    for(let ind = 0; ind<2; ind++) {

        console.info(`>>>>> Starting to Crawl page ${ind}`);

        const crawler: Crawler = new Crawler(ind);
        await crawler.crawl();
    }
})();