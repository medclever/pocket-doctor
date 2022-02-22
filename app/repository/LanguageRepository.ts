import { LanguageEntity } from '../entity/LanguageEntity';

export class LanguageRepository {
  static create() {
    return new LanguageRepository();
  }

  async loadAll(): Promise<LanguageEntity[]> {
    return []
  }

  async loadByID(id: number): Promise<LanguageEntity> {
    if (id == 1) {
      return new LanguageEntity(1, 'ru', 'Русский');
    } else {
      return new LanguageEntity(2, 'en', 'English');
    }
  }

  async langCode(code: string): Promise<LanguageEntity> {
    if (code == 'ru') {
      return new LanguageEntity(1, 'ru', 'Русский');
    } else {
      return new LanguageEntity(2, 'en', 'English');
    }
  }

  async loadByIDs(ids: number[]): Promise<LanguageEntity[]> {
    return Promise.all(ids.map((id) => this.loadByID(id)));
  }
}
