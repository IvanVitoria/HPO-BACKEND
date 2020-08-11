import { Crawler } from "./crawler.service";


export class HPO {

    constructor() {};

    public async startCrawling() {

        for(let ind = 0; ind<2; ind++) {

            console.info(`\n>>>>> Starting to Crawl restuls page ${ind} \n`);
    
            const crawler: Crawler = new Crawler();
            let links = await crawler.crawlResultsPage(ind);

            console.debug(links.join('\n'));

            if(links.length > 0) {
                let ids = this.extractAnnouncementIds(links);
                
                ids.forEach(async (id) => {
                    console.info(`\n>>>>> Starting to Crawl announcment page ID = ${id} \n`);
                    const announcementData = await crawler.crawlAnnouncementPage(id);
/*                    const announcement: Annoucement = new Annoucement(
                        announcementData.id, 
                        announcementData.url, 
                        announcementData.date, 
                        announcementData.description, 
                        announcementData.document_url
                        ); 
                        */
                        
                    console.log(JSON.stringify(announcementData));                           
                    console.info(`\n>>>>> Finished to Crawl announcment page ID = ${id} \n`);
                });
            }

            console.info(`\n<<<<< Finished to Crawl page ${ind} \n`);
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