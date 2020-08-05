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

}
