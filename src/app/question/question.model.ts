import { Answer } from '../answer/answer.model';

export class Question {
  /* tslint:disable:variable-name */
  public _id?: string;
  public answers: Answer[];
  public title: string;
  public description: string;
  public createdAt?: Date;
  public icon?: string;

  constructor(
    title: string,
    description: string,
    createdAt?: Date,
    icon?: string,
  ) {
    this._id = '1';
    this.title = title;
    this.description = description;
    this.createdAt = createdAt;
    this.icon = icon;
    this.answers = [];
  }
}
