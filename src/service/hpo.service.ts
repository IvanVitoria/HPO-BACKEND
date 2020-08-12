import {Crawler} from "./crawler.service";
import {Announcement} from "../entity/Announcement";
import {getRepository} from "typeorm";


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
                    console.debug('Crawled data: ', JSON.stringify(announcementData));                           
                    this.saveAnnouncement(announcementData);

                    console.info(`\n>>>>> Finished to Crawl announcment page ID = ${id} \n`);
                });
            }

            console.info(`\n<<<<< Finished to Crawl page ${ind} \n`);
        }

    }

    private saveAnnouncement(announcementData : any) : void {
        const announcement : Announcement = new Announcement();
        announcement.externalId = announcementData.id;
        announcement.description = announcementData.description;
        announcement.documentUrl = announcementData.document_url;
        announcement.url = announcementData.url; 
        announcement.publishedAt = this.datify(announcementData.date);
        /*const now : Date = new Date();
        announcement.createdAt = now;
        announcement.updatedAt = now;*/

        const annoucementRepository = getRepository(Announcement);
        annoucementRepository.save(announcement);
        console.log("Saved a new Announcement with id: " + announcement.id);
    }

    
    private datify(field : string) : Date {
        const dateFields = field.trim().split('/');
        return new Date(Number(dateFields[2]), (Number(dateFields[1]) - 1), Number(dateFields[0]));
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