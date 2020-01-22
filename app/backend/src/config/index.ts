import * as _ from 'lodash';
import apiConfig from './api';
import hostConfig from './host';

class Config {
  public api: any;
  public host: any;

  constructor() {
    this.api = apiConfig();
    this.host = hostConfig({ BACKEND_APP_PORT: undefined });
  }

  get(path: string | string[]) {
    return _.get(this, path);
  }
}

export default new Config();
