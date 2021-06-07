export class WorkWould {
  public username: string;
  public job: string;
  public description: string;
  public phoneNumber:string;
  

  constructor(username: string, job: string, desc: string, phoneNumber:string) {
    this.username = username;
    this.job = job;
    this.description = desc;
    this.phoneNumber = phoneNumber;
  }
}
