import {Chapter} from "./chapter.interface";
import {Entry} from "./pagination.interface";

export interface Publication extends Entry {
  url: string;
  title: string;
  thumbnailUrl: string;
  author?: string;
  artist?: string;
  genre?: string;
  description?: string;
  language?: string;
  lastUpdated?: string;
  initialized?: boolean; // set to true so no more data is fetched
  chapters?: Chapter[];
}
