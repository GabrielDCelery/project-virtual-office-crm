import * as express from 'express';

interface IAPIResultWrapper {
  returnJSON(
    res: express.Response,
    error: Error,
    payload: any
  ): express.Response;
}

export class APIResultWrapper implements IAPIResultWrapper {
  constructor() {
    this.returnJSON = this.returnJSON.bind(this);
  }

  static createInstance() {
    return new APIResultWrapper();
  }

  returnJSON(res: express.Response, error: Error, payload: any) {
    return res.json({
      success: error ? false : true,
      error,
      payload
    });
  }
}
