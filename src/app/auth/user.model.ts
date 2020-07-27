export class User {
  constructor(
    public email: string,
    public password: string,
    public firstName?: string,
    public lastName?: string,
    public userId?: string,
    public createdAt?: Date,
    public lastLogin?: Date,
  ) { }

  /* tslint:disable:typedef */
  public fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
