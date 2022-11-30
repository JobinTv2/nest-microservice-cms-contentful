import { Injectable } from '@nestjs/common';
import axios from 'axios';
@Injectable()
export class OrderService {
  async getForm() {
    const result = await axios(
      `${process.env.CONTENTFUL_CONTENT_DELIVERY_BASE_URL}/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/${process.env.CONTENTFUL_ENVIRONMENT_ID}/entries?sys.id=1rCnhuQzprh9khONj2tzkO&access_token=${process.env.CONTENTFUL_CONTENT_DELIVERY_TOKEN}`,
    );
    return result.data;
  }
}
