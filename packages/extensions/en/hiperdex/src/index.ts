import "reflect-metadata";
import {injectable} from 'tsyringe';
import {lastValueFrom} from "rxjs";
import {HTMLElement} from "node-html-parser";
import {
  Chapter, 
  Cursor, 
  PageInfo, 
  Publication, 
  HttpService,
  HTMLService,
  PublicationSource,
} from 'kami-lib';

@injectable()
class HiperdexSource implements PublicationSource {
  constructor(private http: HttpService, private html: HTMLService) {}

  public name: string = 'Example';

  private baseUrl: string = 'https://hiperdex.com';

  getPublicationsFromDocument(document: HTMLElement) {
    const els = document.querySelectorAll('.page-item-detail.manga');
    const publications: Publication[] = els.map(el => {
      const title = el.querySelector('a').getAttribute('title');
      const url = el.querySelector('a').getAttribute('href');
      const thumbnailUrl = el.querySelector('img').getAttribute('src');
      return {url, title, thumbnailUrl};
    });
    return publications;
  }

  async popular(cursor: Cursor): Promise<PageInfo> {
    let publications: Publication[] = [];
    let hasNextPage: boolean = true;
    try {
      const req = this.http.get(`${this.baseUrl}/page/${cursor.page}`)
      const response = await lastValueFrom(req);
      const {data} = response;

      const document = this.html.parse(data);
      publications = this.getPublicationsFromDocument(document);
    } catch(err) {
      hasNextPage = false;
    }
    return <PageInfo> {
      hasNextPage,
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

export default HiperdexSource;
