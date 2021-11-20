import Dexie, {Table} from 'dexie';

export interface ChapterProgess {
  publication_id: string;
  chapter_id: string;
  pages_read: number;
  page_count?: number;
  last_read_at?: number;
}

export interface Publication {
  publication_id: string;
  source_id: string;
  thumbnail_url: string;
  title: string;
  history?: PublicationHistory;
  library_category_id?: string;
}

export interface PublicationHistory {
  last_chapter_id?: string;
  last_chapter_number?: number;
  last_viewed_at?: Date;
}

export interface LibraryCategory {
  id?: string;
  name: string;
}

export class DbService extends Dexie {
  chapter_progress!: Table<ChapterProgess>;

  publications!: Table<Publication>;

  library_categories!: Table<LibraryCategory>;

  constructor() {
    super('kami');
    this.version(2).stores({
      chapter_progress: '[publication_id+chapter_id]',
      publications: '[publication_id+source_id], history.last_viewed_at, library_category_id',
      library_categories: '++id, name',
    });
  }

  requestPersistedStorage() {
    return navigator.storage?.persist?.();
  }

  isStoragePersisted() {
    return navigator.storage?.persisted?.();
  }
}

export default new DbService();
