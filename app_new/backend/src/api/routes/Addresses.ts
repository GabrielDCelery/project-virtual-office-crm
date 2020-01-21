import * as express from 'express';
import { APIResultWrapper } from '../utils';
import orchestrator from '../../orchestrator';
import IRoutesGenerator from './RoutesGenerator.interface';

export class Addresses implements IRoutesGenerator {
  static createInstance() {
    return new Addresses();
  }

  createRoutes() {
    const router: express.IRouter = express.Router();
    const apiResultWrapper: APIResultWrapper = APIResultWrapper.createInstance();

    router.get('/', async (req: express.Request, res: express.Response) => {
      const { error, payload } = await orchestrator.execute(
        'addresses',
        'findAll'
      );

      return apiResultWrapper.returnJSON(res, error, payload);
    });

    return router;
  }
}
