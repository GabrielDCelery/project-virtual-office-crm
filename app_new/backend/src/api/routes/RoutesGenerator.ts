import * as express from 'express';
import { APIResultWrapper } from '../utils';
import { Orchestrator } from '../../orchestrator';

export interface IRoutesGenerator {
  createRouter(orchestrator: Orchestrator): express.IRouter;
}

export default abstract class RoutesGenerator implements IRoutesGenerator {
  protected apiResultWrapper: APIResultWrapper;
  abstract _createRouter(
    router: express.IRouter,
    apiResultWrapper: APIResultWrapper,
    orchestrator: Orchestrator
  ): express.IRouter;

  createRouter(orchestrator: Orchestrator) {
    return this._createRouter(
      /* router */ express.Router(),
      /* apiResultWrapper */ new APIResultWrapper(),
      /* orchestrator */ orchestrator
    );
  }
}
