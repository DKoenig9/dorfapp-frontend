export class WorkNeed {
  constructor(
    public __typename: string,
    public id: string,
    public username: string,
    public userId: string,
    public job: string,
    public description: string,
    public phoneNumber: string
  ) {}
}
