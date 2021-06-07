export class User {
  constructor(
    public id: string,
    public email: string,
    public password: string,
    public username: string,
    public phoneNumber: string,
    public userRole: string,
  ) {}
}
