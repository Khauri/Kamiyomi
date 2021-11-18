import "reflect-metadata";
import {injectable} from 'tsyringe';
import {lastValueFrom, Observable} from 'rxjs';
import {HTMLElement} from 'node-html-parser';
import {AxiosResponse} from 'axios';
import {
  Page,
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

  private async getDocumentFromURL(url: string, method = 'get'): Promise<HTMLElement> {
    const req = this.http[method](url) as Observable<AxiosResponse<any, any>>;
    const response = await lastValueFrom(req);
    const {data} = response;
    const document = this.html.parse(data);
    return document;
  }

  private getPublicationsFromDocument(document: HTMLElement) {
    const els = document.querySelectorAll('.page-item-detail.manga');
    const publications: Publication[] = els.map(el => {
      const title = el.querySelector('a').getAttribute('title');
      const url = el.querySelector('a').getAttribute('href');
      const thumbnailUrl = el.querySelector('img').getAttribute('src');
      return {url, title, thumbnailUrl};
    });
    return publications;
  }

  private getChaptersFromDocument(document: HTMLElement): Chapter[] {
    const els = document.querySelectorAll('.wp-manga-chapter');
    return els.map(el => {
      return {
        title: el.querySelector('a').innerText.trim(),
        id: el.querySelector('a').getAttribute('href'),
        released: el.querySelector('.chapter-release-date').innerText.trim(), // todo: convert to ISO date
      }
    });
  }

  private getPagesFromDocument(document: HTMLElement): Page[] {
    const els = document.querySelectorAll('.wp-manga-chapter-img');
    return els.map(el => {
      return ({
        src: el.getAttribute('src').trim(),
      });
    });
  }

  private getPublicationDetailsFromDocument(document: HTMLElement, id: string): Publication {
    // Chapters need to be loaded asynchronously
    return {
      url: id,
      title: document.querySelector('.post-title').innerText.trim(),
      thumbnailUrl: document.querySelector('.summary_image img').getAttribute('src'),
      description: document.querySelector('.summary__content').innerText.trim(),
      author: document.querySelector('.author-content').innerText.trim(),
      artist: document.querySelector('.artist-content').innerText.trim(),
      initialized: false,
    }
  }

  async popular(cursor: Cursor): Promise<PageInfo<Publication>> {
    let publications: Publication[] = [];
    let hasNextPage: boolean = true;
    try {
      const document = await this.getDocumentFromURL(`${this.baseUrl}/page/${cursor.page}`);
      publications = this.getPublicationsFromDocument(document);
    } catch(err) {
      hasNextPage = false;
    }
    return <PageInfo<Publication>> {
      hasNextPage,
      entries: publications,
    };
  }

  search(query: string, cursor: Cursor): Promise<PageInfo<Publication>> {
    throw new Error('Method not implemented.');
  }

  async chapters(pub: Publication): Promise<Chapter[]> {
    const document = await this.getDocumentFromURL(`${pub.url}ajax/chapters`, 'post');
    return this.getChaptersFromDocument(document);
  }

  async details(pub: Publication): Promise<Publication> {
    const document = await this.getDocumentFromURL(pub.url);
    return this.getPublicationDetailsFromDocument(document, pub.url);
  }
  
  async pages(chapter: Chapter, pub: Publication, cursor: Cursor): Promise<PageInfo<Page>> {
    const document = await this.getDocumentFromURL(chapter.id);
    return {
      hasNextPage: false,
      entries: this.getPagesFromDocument(document),
    }
  }
}

export default HiperdexSource;
