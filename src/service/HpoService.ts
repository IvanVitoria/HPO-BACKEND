import {HpoCarwler} from "./HpoCarwler";
import {Announcement} from "../entity/Announcement";
import {getRepository} from "typeorm";


export class HpoService {

    private readonly annoucementRepository = getRepository(Announcement);

    constructor() {};

    public async startCrawling() {

        const initialPage : number = 1;

        console.info(`\Crawler starts`);        
                   
        await this.crawlPage(initialPage)
        .then(() => console.info(`\Crawler finishes`))
        .catch(e => console.error(e));
        
    }



    private async crawlPage(pageNumber : number) : Promise<void> {
        let crawledAnnouncements : number = 0;

        console.info(`\n>>>>> Starting to Crawl restuls page ${pageNumber} \n`);
    
        const crawler: HpoCarwler = new HpoCarwler();
        let links = await crawler.crawlResultsPage(pageNumber);

        console.debug(links.join('\n'));

        if(links.length > 0) {
            let ids = this.extractAnnouncementIds(links);

            for (let index = 0; index < links.length; index++) {
                let id : number = ids[index];

                const existingAnnouncement = await this.annoucementRepository.findOne({ where: { externalId: id } });
                if(existingAnnouncement?.externalId) {
                    console.info(`\nSkipping announcment ID = ${id} because already exists \n`);
                } else {
                    console.info(`\n>>>>> Starting to Crawl announcment page ID = ${id} \n`);
                
                    await crawler.crawlAnnouncementPage(id)
                    .then(announcementData => {
                        if(announcementData) {
                            console.debug('\nCrawled data: ', JSON.stringify(announcementData) + "\n");                           
                            this.saveAnnouncement(announcementData);
                        } else {
                            console.log(`ERROR: Unable to extract data from announcement ID = ${id}`);
                        } 
                    });
                    
                    console.info(`\n>>>>> Finished to Crawl announcment page ID = ${id} \n`);
                    crawledAnnouncements++;
                }
            }

        }

        console.info(`\n<<<<< Finished to Crawl page ${pageNumber} with ${crawledAnnouncements} new announcements \n`);

        if(crawledAnnouncements > 0) {
            pageNumber++;
            await this.crawlPage(pageNumber)
            .catch(e => console.error(e));
            
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
        .then( r => console.log("Saved a new Announcement with id: " + r.id))
        .catch(e => console.error(e));
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