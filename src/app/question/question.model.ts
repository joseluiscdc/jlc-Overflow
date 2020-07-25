import { Answer } from '../answer/answer.model';
import { User } from '../auth/user.model';

export class Question {
  /* tslint:disable:variable-name */
  public _id?: string;
  public answers: Answer[];
  public title: string;
  public description: string;
  public createdAt?: Date;
  public icon?: string;
  user: User;

  constructor(
    title: string,
    description: string,
    createdAt?: Date,
    icon?: string,
    user?: User,
  ) {
    this.title = title;
    this.description = description;
    this.createdAt = createdAt;
    this.icon = icon;
    this.answers = [];
    this.user = user;
  }
}
