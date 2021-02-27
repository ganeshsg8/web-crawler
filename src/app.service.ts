import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {

  constructor(
    private config: ConfigService
  ) { }

  getAll(search: any): string {
    let data = require(this.config.get<string>("jsonFile"))
    if (!search) {
      return data;
    }
    let records = data.filter(e => {
      if (isNaN(search)) {
        return e.name.includes(search);
      } else {
        if (search.length == 1) {
          search = search + '.0';
        }
        return e.rating == search;
      }
    })
    return records
  }
}
