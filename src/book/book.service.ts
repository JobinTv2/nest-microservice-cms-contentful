import { Injectable } from '@nestjs/common';
import axios from 'axios';
@Injectable()
export class BookService {
  async getForm() {
    const result = await axios(
      `${process.env.CONTENTFUL_CONTENT_DELIVERY_BASE_URL}/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/${process.env.CONTENTFUL_ENVIRONMENT_ID}/entries?sys.id=TyA16n8unGpZ3uuuHHwYA&access_token=${process.env.CONTENTFUL_CONTENT_DELIVERY_TOKEN}`,
    );
    return result.data;
  }
}
