// controllers/example.controller.ts
import { Request, Response, NextFunction } from 'express';
import { AgricultureService } from '../services/agriculture.service';

const service = new AgricultureService();

export class AgricultureController {
  public async getExample(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = await service.getExampleData();
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}