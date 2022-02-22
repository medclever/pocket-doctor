export default class ArticleEntity {
  constructor(
    public id: number,
    public lang_id: number,
    public code = '',
    public position: number,
    public is_locked: boolean,
    public image = '',
    public title: string,
    public necessary: string,
    public possible: string,
    public must_not: string,
    public important: string,
    public text: string,
  ) {}

  getTitleWithPosition() {
    return this.code === 'about'
      ? this.title
      : `${this.position}. ${this.title}`;
  }
}

export type ArticleTextFields =
  | 'text'
  | 'necessary'
  | 'possible'
  | 'must_not'
  | 'important';
