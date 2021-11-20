import db from './db';
import lib from './lib';

class PublicationsService {
  async savePublication(source_id: any, publication_id: string, details: any) {
    try {
      console.log(details);
      await db.publications.add({
        source_id,
        publication_id,
        title: details.title,
        thumbnail_url: details.thumbnailUrl,
      });
    } catch (err) {
      // item already exists
      await db.publications
        .where('[publication_id+source_id]')
        .equals([publication_id, source_id])
        .modify(publication => {
          publication.title = details.title;
          publication.thumbnail_url = details.thumbnailUrl;
        });
    }
  }

  async getPublicationHistory(): Promise<any> {
    const publications = await db.publications
      .orderBy('history.last_viewed_at')
      .filter((item) => !!item.history?.last_chapter_number)
      .toArray();
    return publications.reverse();
  }

  async getAllChapterProgress(publication_id: string) {
    const proggers = await db.chapter_progress.where('publication_id').equals(publication_id).toArray();
    return proggers;
  }

  async getLastReadChapter(publication_id: string) {
    const latestChapter = await db.chapter_progress
      .where('publication_id')
      .equals(publication_id)
      .sortBy('last_read_at');
    return latestChapter.pop();
  }

  async getChapterProgress(publication_id: string, chapter_id: string) {
    const chapterProgress = await db.chapter_progress
      .where('[publication_id+chapter_id]')
      .equals([publication_id, chapter_id])
      .first();
    return chapterProgress;
  }

  async updateChapterProgress(publication_id: string, chapter_id: string, pagesRead: number, totalPages: number) {
    try {
      await db.chapter_progress.add({
        publication_id,
        chapter_id,
        pages_read: pagesRead,
        page_count: totalPages,
      })
    } catch(err) {
      // item already exists, probably
      await db.chapter_progress
        .where('[publication_id+chapter_id]')
        .equals([publication_id, chapter_id])
        .modify(function(item) {
          item.pages_read = Math.max(pagesRead, item.pages_read);
          item.page_count = totalPages || item.page_count;
        });
    }
  }

  async updatePublicationHistory(publication_id: string, source_id: string, last_chapter_number: number, chapter_id: string) {
    await db.publications
      .where('[publication_id+source_id]')
      .equals([publication_id, source_id])
      .modify((item) => {
        const history = {...item.history}
        history.last_chapter_number = last_chapter_number;
        history.last_chapter_id = chapter_id;
        history.last_viewed_at = new Date();
        item.history = history;
      });
  }

  async addPublicationToCategory(publication_id: string, source_id: string, category_name: string) {
    let cat = await lib.getCategoryByName(category_name);
    if(!cat) {
      cat = await lib.createCategory(category_name);
    }
    await db.publications
      .where('[publication_id+source_id]')
      .equals([publication_id, source_id]).modify((item) => {
        item.library_category_id = cat?.id;
      });
  }

  async removePublicationFromCategory(publication_id: string, source_id: string) {
    await db.publications
      .where('[publication_id+source_id]')
      .equals([publication_id, source_id])
      .modify((item) => {
        item.library_category_id = undefined;
      });
  }
}

export default new PublicationsService();