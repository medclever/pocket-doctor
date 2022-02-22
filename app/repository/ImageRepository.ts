import ImageEntity from '../entity/ImageEntity';
import { images } from '../export/images';

export default class ImageRepository {
  constructor(public langID: number) {}

  static create(langId: number) {
    return new ImageRepository(langId);
  }

  /**
   * @param {number} id
   * @returns {Promise<ImageEntity>}
   */
  async loadByID(id: number): Promise<ImageEntity | undefined> {
    const data = images.find(i => i.lang_id == this.langID && i.id == id);
    if (!data) return undefined;
    return new ImageEntity(
      data.id,
      data.lang_id,
      data.name,
      data.file,
      data.width,
      data.height,
    );
  }

  async loadByIDs(ids: number[]): Promise<ImageEntity[]> {
    const items = await Promise.all(ids.map((id) => this.loadByID(id)));
    const itemsWithoutEmpty: ImageEntity[] = items.filter(i => i !== undefined) as any;
    return itemsWithoutEmpty;
  }
}
