import { Tmodels } from '../models';

export interface IController {}

export default abstract class Controller implements IController {
  protected models: Tmodels;

  constructor(models: Tmodels) {
    this.models = models;
  }
}
