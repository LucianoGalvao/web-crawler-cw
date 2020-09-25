import { Injectable } from '@nestjs/common';

const puppeteer = require('puppeteer');
// * Require the cheerio library.
const cheerio = require('cheerio');

@Injectable()
export class AppService {
  async getHello(search: string): Promise<string> {
    const browser = await puppeteer.launch({
      //  * Use the default headless mode (don't show the browser).
      headless: true,
    });

    const page = await browser.newPage();

    await page.goto(
      `https://www.1377x.to/sort-category-search/${search}/Games/seeders/desc/1/`,
    );

    //  * Get page content as HTML.
    let content = await page.content();

    //  * Load content in cheerio.
    let $ = cheerio.load(content);

    console.log($('title').text());
    let link = '';

    $('a').each((index, value) => {
      if (link !== '') {
        return;
      }
      let linkItem = $(value).attr('href');
      if (!linkItem) {
        return;
      }
      if (linkItem.includes('/torrent/')) {
        link = linkItem;
      }
      console.log('link: ', link);
    });

    // const link = 'https://www.1377x.to/torrent/4618757/Among-Us-v2020-9-9s/';

    await page.goto(`https://www.1377x.to${link}`);

    content = await page.content();

    $ = cheerio.load(content);

    console.log($('title').text());
    // console.log($.html());

    browser.close();

    return 'Hello World!';
  }
}
