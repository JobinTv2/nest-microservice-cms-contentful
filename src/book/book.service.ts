import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import axios from 'axios';
import { Cache } from 'cache-manager';
@Injectable()
export class BookService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async getForm() {
    const data = await this.getOrSetCache('book/form', async () => {
      const response = await axios(
        `${process.env.CONTENTFUL_CONTENT_DELIVERY_BASE_URL}/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/${process.env.CONTENTFUL_ENVIRONMENT_ID}/entries?sys.id=TyA16n8unGpZ3uuuHHwYA&access_token=${process.env.CONTENTFUL_CONTENT_DELIVERY_TOKEN}`,
      ).then((res) => {
        return res;
      });

      return response.data;
    });
    console.log(data);
    return { ...data };
  }

  async getTodos(id) {
    const data = await this.getOrSetCache(`todos:${id}`, async () => {
      const response = await axios({
        url: `https://jsonplaceholder.typicode.com/todos/${id}`,
        headers: {
          'accept-encoding': '*',
        },
      });
      return response.data;
    });
    return data;
  }

  async getOrSetCache(key, cb) {
    const data = await this.cacheManager.get(key);
    if (data) return data;

    let error;
    let newData;
    try {
      newData = await cb();
    } catch (err) {
      error = err;
    }

    if (newData) await this.cacheManager.set(key, newData);
    if (!newData) return { error };
    return newData;
  }
}
