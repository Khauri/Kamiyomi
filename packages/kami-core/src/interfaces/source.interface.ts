import {Publication} from "./publication.interface";
import {Chapter} from "./chapter.interface";
import {Cursor, PageInfo} from "./pagination.interface";

export interface PublicationSource {
  name: string;
  popular(cursor: Cursor): Promise<PageInfo>;
  search(query: string, cursor: Cursor): Promise<PageInfo>;
  chapters(pub: Publication): Promise<Chapter[]>;
  details(pub: Publication): Promise<Publication>;
  pages(chapter: Chapter, pub: Publication, cursor: Cursor): Promise<string>;
}
