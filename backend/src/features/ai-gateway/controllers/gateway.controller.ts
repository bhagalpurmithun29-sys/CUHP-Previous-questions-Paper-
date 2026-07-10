import { Request, Response, NextFunction } from 'express';
import { GatewayService } from '../services/gateway.service';

export class GatewayController {
  private service = new GatewayService();

  chat = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { request, taskType } = req.body;
      const data = await this.service.chat(request, taskType, req.user?.id!);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };

  getProviders = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = this.service.getProviders();
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };
}
