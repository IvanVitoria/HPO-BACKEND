import puppeteer = require('puppeteer');

export class Crawler {
  
  constructor() {};

  async crawlResultsPage(pageNumber: number) : Promise<string[]> {     
    const HPO_URL = `http://www.registresolicitants.cat/registre/noticias/03_noticias.jsp?numpagactual=${pageNumber}`;

    console.info(`Fetching URL: ${HPO_URL}`);  

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
        console.error(error);
      } finally {
        console.info(`Finished to crawl URL: ${HPO_URL}`);  
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
        const tagP = divs[1].getElementsByTagName('p')[0];
        const tagA = tagP.getElementsByTagName('a')[0];
        result.push(tagA.href); 

        return result;
      }, container);
      
      //const dateFields = content[0].trim().split('/');
      //const dateField = new Date(Number(dateFields[2]), (Number(dateFields[1]) - 1), Number(dateFields[0]));

      const dateField = content[0];
      const descriptionField = content[1];
      const documentLink = content[2];

      //console.debug(`${dateField} - ${descriptionField} - ${documentLink}`);
 
      await browser.close();

      return {
        id: announcementId,
        url: HPO_URL,
        date: dateField,
        description: descriptionField,
        document_url: documentLink
      }
    } catch(error) {
      console.error(error);
    } 
  }



}
