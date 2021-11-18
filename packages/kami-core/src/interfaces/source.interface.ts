import {Publication} from "./publication.interface";
import {Chapter} from "./chapter.interface";
import {Cursor, PageInfo} from "./pagination.interface";
import {Page} from "./page.interface";

export interface PublicationSource {
  name: string;
  popular(cursor: Cursor): Promise<PageInfo<Publication>>;
  search(query: string, cursor: Cursor): Promise<PageInfo<Publication>>;
  chapters(pub: Publication): Promise<Chapter[]>;
  details(pub: Publication): Promise<Publication>;
  pages(chapter: Chapter, pub: Publication, cursor: Cursor): Promise<PageInfo<Page>>;
}
