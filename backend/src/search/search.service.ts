// backend/src/search/search.service.ts
import { Injectable } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';

@Injectable()
export class SearchService {
  private client: Client;

  constructor() {
    this.client = new Client({
      node: process.env.ELASTICSEARCH_URL || 'http://localhost:9200',
    });
  }

  async search(index: string, query: string) {
    return this.client.search({
      index,
      query: {
        match: { content: query },
      },
    });
  }
}