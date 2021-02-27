import { HttpService, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as cherio from 'cheerio';
import * as fs from 'fs';
@Injectable()
export class CrawlerService {
    private logger = new Logger("CrawlerService")
    private url = 'https://www.imdb.com/search/title/?count=10&groups=top_1000&sort=user_rating';
    private records = []
    private jsonFile;
    constructor(
        private httpService: HttpService,
        private config: ConfigService
    ) {
        this.jsonFile = this.config.get('jsonFile');
        // this.scrapping(this.url, 1);
    }

    async scrapping(url, start) {
        try {
            let result = await this.httpService.get(url).toPromise()
            let $ = cherio.load(result.data)
            let data = [];
            $(".lister-item-header").each(function (index) {
                data[index] = {
                    name: $(this).find("a").text()
                }
            });

            $(".runtime").each(function (index) {
                data[index]['runtime'] = $(this).text()
            })
            $(".ratings-imdb-rating").each(function (index) {
                data[index]['rating'] = $(this).find('strong').text()
            })
            $(".genre").each(function (index) {
                data[index]['genre'] = $(this).text().trim()
            })
            this.records = this.records.concat(data);
            console.log("records.length ", this.records.length);
            if (this.records.length >= 100) {
                // write to file
                fs.writeFileSync(this.jsonFile, JSON.stringify(this.records))
                this.records = []
            } else {
                start += 10
                url = 'https://www.imdb.com/search/title/?count=10&groups=top_1000&sort=user_rating&' + 'start=' + start;
                this.logger.log("new URL " + url);
                this.scrapping(url, start)
            }
        } catch (error) {
            throw error;
        }

        // (result.data);
    }
}
