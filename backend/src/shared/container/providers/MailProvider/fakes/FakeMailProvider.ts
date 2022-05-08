import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailProvider from '../models/IMailProvider';

export default class FakeMailProvider implements IMailProvider {
  private messages: ISendMailDTO[] = [];

  public async sendMail(mail: ISendMailDTO): Promise<void> {
    this.messages.push(mail);
  }
}
