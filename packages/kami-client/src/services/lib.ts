import db, { LibraryCategory, Publication } from './db';

class LibraryService {
  async getCategoriesAndPublications(): Promise<(LibraryCategory & {publications: Publication[]})[]> {
    const categories = await db.library_categories.toArray();
    const category_ids = (categories.map(c => c.id) as unknown) as number[];
    const publications = await db.publications
      .where('library_category_id')
      .anyOf(category_ids)
      .toArray();
    return categories.map(c => {
      return {
        ...c,
        publications: publications.filter(p => p.library_category_id === c.id),
      };
    });
  }

  async getCategoryByName(name: string): Promise<LibraryCategory | undefined> {
    return await db.library_categories.where('name').equals(name).first();
  }

  async createCategory(name: string = 'default'): Promise<LibraryCategory | undefined> {
    try {
      await db.library_categories.add({ name });
    } catch(err) {
      // category already exists
    }
    return this.getCategoryByName(name);
  }
}

export default new LibraryService();