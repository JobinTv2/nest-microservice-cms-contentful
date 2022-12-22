import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import axios from 'axios';
import { Cache } from 'cache-manager';
@Injectable()
export class BookService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async getForm() {
    const result = await axios(
      `${process.env.CONTENTFUL_CONTENT_DELIVERY_BASE_URL}/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/${process.env.CONTENTFUL_ENVIRONMENT_ID}/entries?sys.id=TyA16n8unGpZ3uuuHHwYA&access_token=${process.env.CONTENTFUL_CONTENT_DELIVERY_TOKEN}`,
    );
    // await this.cacheManager.reset();
    let data = await this.cacheManager.get('book-form-data');

    if (!data) {
      console.log(data, 'data');
      await this.cacheManager.set('book-form-data', result.data, 10);
      data = await this.cacheManager.get('book-form-data');
    }
    return data;
  }
}
