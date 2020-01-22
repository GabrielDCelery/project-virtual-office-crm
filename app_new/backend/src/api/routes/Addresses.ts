import * as express from 'express';
import orchestrator from '../../orchestrator';
import RoutesGenerator from './RoutesGenerator';

export class Addresses extends RoutesGenerator {
  createRoutes() {
    this.router.get(
      '/',
      async (req: express.Request, res: express.Response) => {
        const { error, payload } = await orchestrator.execute(
          'addresses',
          'findAll'
        );

        return this.apiResultWrapper.returnJSON(res, error, payload);
      }
    );

    return this;
  }
}
