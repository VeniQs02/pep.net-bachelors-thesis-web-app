export class Message{
  public _id: string;
  public messageCreationDate: string;
  constructor(
    public customerName: string,
    public customerEmail: string,
    public message: string
  ) {}

}
