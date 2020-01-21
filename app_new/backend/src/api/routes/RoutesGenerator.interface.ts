import * as express from 'express';

export default interface IRoutesGenerator {
  createRoutes(): express.IRouter;
}
