import * as express from 'express';
import { APIResultWrapper } from '../utils';

export interface IRoutesGenerator {
  createRoutes(): this;
  getRouter(): express.IRouter;
}

export default abstract class RoutesGenerator implements IRoutesGenerator {
  protected apiResultWrapper: APIResultWrapper;
  protected router: express.IRouter;
  abstract createRoutes(): this;

  constructor() {
    this.router = express.Router();
    this.apiResultWrapper = new APIResultWrapper();
  }

  getRouter() {
    return this.router;
  }
}
