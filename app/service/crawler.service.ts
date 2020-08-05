import puppeteer = require('puppeteer');
import { Annoucement } from "../model/announcement.model";

export class Crawler {
  
  readonly HPO_URL: string = `http://www.registresolicitants.cat/registre/noticias/03_noticias.jsp?numpagactual=${this.pageNumber}`;

  constructor(public pageNumber: number) {};

  async crawl() : Promise<void> {     
    console.info(`Fetching URL: ${this.HPO_URL}`);  
        try {
          const browser = await puppeteer.launch();
          const page = await browser.newPage();
          await page.goto(this.HPO_URL);
          
          const resultsSelector = '.notdcha a';
          const links = await page.evaluate(resultsSelector => {
            const anchors = Array.from(document.querySelectorAll(resultsSelector));
            return anchors.map(anchor => {
              //const title = anchor.textContent.split('|')[0].trim();
              return `${anchor.href}`;
            });
          }, resultsSelector);

          console.log(links.join('\n'));
                  
          
          await browser.close();
      
      } catch(error) {
        console.error(error);
      } finally {
        console.info(`Finished to crawl URL: ${this.HPO_URL}`);  
      }
    

    //const announcement: Annoucement = new Annoucement();
  }

}
