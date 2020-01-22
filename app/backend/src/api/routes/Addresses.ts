import * as express from 'express';
import RoutesGenerator from './RoutesGenerator';
import { APIResultWrapper } from '../utils';
import { OrchestratorMethod as OrchestratorMethodEnuums } from '../../common/enums';
import { Orchestrator } from '../../orchestrator';
const { ORCHESTRATOR_METHOD_FIND_ALL_ADDRESSES } = OrchestratorMethodEnuums;

export class Addresses extends RoutesGenerator {
  _createRouter(
    router: express.IRouter,
    apiResultWrapper: APIResultWrapper,
    orchestrator: Orchestrator
  ) {
    router.get('/', async (req: express.Request, res: express.Response) => {
      const { error, payload } = await orchestrator.execute(
        ORCHESTRATOR_METHOD_FIND_ALL_ADDRESSES
      );

      return apiResultWrapper.returnJSON(res, error, payload);
    });

    return router;
  }
}
