export class Chat {
  constructor(
    public title: string,
    public category: string,
    public username: string,
    public message: string,
    public img: string,
    public color: string,
    public createdAt: Date
  ) {}
}
