import { AgricultureRepository } from '../repositories/agriculture.repository';

const repository = new AgricultureRepository();

export class AgricultureService {
  public async getExampleData(): Promise<string[]> {
    return repository.fetchExampleData();
  }
}