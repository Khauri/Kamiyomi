import "reflect-metadata";
import {injectable} from 'tsyringe';
import {
  Chapter, 
  Cursor, 
  PageInfo, 
  Publication, 
  HttpService, 
  PublicationSource,
} from 'kami-lib';
import data from './data.js';

@injectable()
class ExampleSource implements PublicationSource {
  constructor(private http: HttpService) {}

  public name: string = 'Example';

  async popular(cursor: Cursor): Promise<PageInfo> {
    const offset = (cursor.page - 1) * cursor.perPage;
    const publications: Publication[] = data.publications.slice(offset, cursor.perPage);
    return <PageInfo> {
      hasNextPage: publications.length < cursor.perPage,
      entries: publications,
    };
  }

  search(query: string, cursor: Cursor): Promise<PageInfo> {
    throw new Error('Method not implemented.');
  }

  chapters(pub: Publication): Promise<Chapter[]> {
    throw new Error('Method not implemented.');
  }

  details(pub: Publication): Promise<Publication> {
    throw new Error('Method not implemented.');
  }
  
  pages(chapter: Chapter, pub: Publication, cursor: Cursor): Promise<string> {
    throw new Error('Method not implemented.');
  }
}

export default ExampleSource;
