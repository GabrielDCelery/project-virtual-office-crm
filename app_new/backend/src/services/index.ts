import database, { Database } from './database';
import { ServiceName as ServiceNameEnums } from '../common/enums';
const { SERVICE_DATABASE } = ServiceNameEnums;

interface IServices {
  get(serviceName: string): any;
}

export class Services implements IServices {
  private services: {
    [SERVICE_DATABASE]: Database;
  };

  constructor() {
    this.services = {
      [SERVICE_DATABASE]: database
    };
  }

  get(serviceName: ServiceNameEnums) {
    return this.services[serviceName];
  }
}

export default new Services();
