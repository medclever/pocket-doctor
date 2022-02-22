export default class ImageEntity {
  constructor(
    public id: number,
    public lang_id: number,
    public name: string,
    public file: string,
    public width?: number,
    public height?: number,
  ) {}
}
