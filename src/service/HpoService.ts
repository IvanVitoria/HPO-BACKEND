import {HpoCarwler} from "./HpoCarwler";
import {Announcement} from "../entity/Announcement";
import {getRepository} from "typeorm";
import { Logger } from "tslog";

const log: Logger = new Logger();


export class HpoService {

    private readonly annoucementRepository = getRepository(Announcement);

    constructor() {};

    public async startCrawling() {

        const initialPage : number = 1;

        log.info(`Crawler starts`);        
                   
        await this.crawlPage(initialPage)
        .then(() => log.info(`Crawler finishes`))
        .catch(e => log.prettyError(e));
        
    }



    private async crawlPage(pageNumber : number) : Promise<void> {
        let crawledAnnouncements : number = 0;

        log.info(`>>>>> Starting to Crawl restuls page ${pageNumber}`);
    
        const crawler: HpoCarwler = new HpoCarwler();
        let links = await crawler.crawlResultsPage(pageNumber);

        if(links.length > 0) {
            let ids = this.extractAnnouncementIds(links);

            for (let index = 0; index < links.length; index++) {
                let id : number = ids[index];

                const existingAnnouncement = await this.annoucementRepository.findOne({ where: { externalId: id } });
                if(existingAnnouncement?.externalId) {
                    log.info(`Skipping announcment ID = ${id} because already exists`);
                } else {
                    log.info(`>>>>> Starting to Crawl announcment page ID = ${id}`);
                
                    await crawler.crawlAnnouncementPage(id)
                    .then(announcementData => {
                        if(announcementData) {
                            log.debug('Crawled data: ' + JSON.stringify(announcementData));                           
                            this.saveAnnouncement(announcementData);
                        } else {
                            log.error(`Unable to extract data from announcement ID = ${id}`);
                        } 
                    });
                    
                    log.info(`>>>>> Finished to Crawl announcment page ID = ${id}`);
                    crawledAnnouncements++;
                }
            }

        }

        log.info(`<<<<< Finished to Crawl page ${pageNumber} with ${crawledAnnouncements} new announcements`);

        if(crawledAnnouncements > 0) {
            pageNumber++;
            await this.crawlPage(pageNumber)
            .catch(e => log.prettyError(e));
            
        }
    }

    private async saveAnnouncement(announcementData : any) : Promise<void> {
        const announcement : Announcement = new Announcement();
        announcement.externalId = announcementData.id;
        announcement.description = announcementData.description;
        announcement.documentUrl = announcementData.document_url;
        announcement.url = announcementData.url; 
        announcement.publishedAt = this.datify(announcementData.date);
        this.annoucementRepository.save(announcement)
        .then( r => log.info(`Saved a new Announcement with id: ${r.id}`))
        .catch(e => log.prettyError(e));
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