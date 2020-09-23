import puppeteer = require('puppeteer');
import { Logger } from "tslog";

const log: Logger = new Logger();

export class HpoCarwler { 
  
  constructor() {};

  async crawlResultsPage(pageNumber: number) : Promise<string[]> {     
    const HPO_URL = `http://www.registresolicitants.cat/registre/noticias/03_noticias.jsp?numpagactual=${pageNumber}`;

    log.info(`Fetching URL: ${HPO_URL}`);

    let links : string[] = [];

        try {
          const browser = await puppeteer.launch();
          const page = await browser.newPage();
          await page.goto(HPO_URL);
          
          const resultsSelector = '.notdcha a';
          links = await page.evaluate(resultsSelector => {
            const anchors = Array.from(document.querySelectorAll(resultsSelector));
            return anchors.map(anchor => {
              return `${anchor.href}`;
            });
          }, resultsSelector);

          await browser.close();
      } catch(error) {
        log.prettyError(error);
      } finally {
        log.info(`Finished to crawl URL: ${HPO_URL}`);  
      }

      return links;
  }

  async crawlAnnouncementPage(announcementId: number) : Promise<any> {   
    const HPO_URL = `http://www.registresolicitants.cat/registre/noticias/03_noticias_detalle.jsp?idNoticia=${announcementId}`;
    
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(HPO_URL);
      
      const container = '.ContenidoGral div';
      let content = await page.evaluate(container => {
        const divs : HTMLElement[] = Array.from(document.querySelectorAll(container));

        const result : string[] = [];
        
        // date
        result.push(divs[0].innerText.trim()); 
        
        // description
        const strongTag = divs[1].getElementsByTagName('strong')[0]; 
        result.push(strongTag.innerText.trim()); 
        
        // link
        const pList = divs[1].getElementsByTagName('p');
        const tagAList = (pList && pList.length > 0) ? pList[0].getElementsByTagName('a') : divs[1].getElementsByTagName('a');
        
        if(tagAList && tagAList.length > 0) { 
          result.push(tagAList[0].href);
        } else {
          log.warn(`Document link not found for announcement ID = ${announcementId}`);
        }
        
        
        return result;
      }, container);
      
      const dateField = content[0];
      const descriptionField = content[1];
      const documentLink = (content.length > 2) ? content[2] : null ;
 
      await browser.close();

      return {
        id: announcementId,
        url: HPO_URL,
        date: dateField,
        description: descriptionField,
        document_url: documentLink
      }
    } catch(error) {
      log.prettyError(error);
    } 
  }



}
