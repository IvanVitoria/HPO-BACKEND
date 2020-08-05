import { Crawler } from "./crawler.service";
import { Annoucement } from "../model/announcement.model";

export class HPO {

    constructor() {};

    public async startCrawling() {

        for(let ind = 0; ind<2; ind++) {

            console.info(`\n>>>>> Starting to Crawl page ${ind} \n`);
    
            const crawler: Crawler = new Crawler();
            let links = await crawler.crawlResultsPage(ind);

            console.debug(links.join('\n'));

            if(links.length > 0) {
                let ids = this.extractAnnouncementIds(links);
                

            }

            
            console.info(`\n<<<<< Finished to Crawl page ${ind} \n`);


            //const announcement: Annoucement = new Annoucement();

        }

    }
    
    /**
     * Extracts each 'idNoticia' from the URL of the links. 
     * 
     * Example of URL: http://www.registresolicitants.cat/registre/noticias/03_noticias_detalle.jsp?idNoticia=3804
     * 
     * @param links 
     */
    private extractAnnouncementIds(links : string[]) : number[] {
        return links.map<number>((element) => {
            return Number(element.split('=')[1]);
        });
    }

}

 (async () => {

    const hpo: HPO = new HPO();
    hpo.startCrawling();
})();