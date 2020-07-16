export class User {
  constructor(
    public email: string,
    public password: string,
    public firstName?: string,
    public lastName?: string,
  ) { }

  /* tslint:disable:typedef */
  public fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
