import services, { Services } from '../services';
import { ServiceName as ServiceNameEnums } from '../common/enums';
const { SERVICE_DATABASE } = ServiceNameEnums;

interface IServicesLoader {
  start(): Promise<Services>;
  stop(): Promise<void>;
}

class ServicesLoader implements IServicesLoader {
  async start() {
    const {
      NODE_ENV,
      SERVICE_DB_CLIENT,
      SERVICE_DB_USER,
      SERVICE_DB_HOST,
      SERVICE_DB_PASSWORD,
      SERVICE_DB_DATABASE,
      SERVICE_DB_CHARSET,
      SERVICE_DB_PORT,
      SERVICE_REDIS_HOST,
      SERVICE_REDIS_PORT,
      SERVICE_JWT_SECRET,
      SERVICE_JWT_EXPIRY_IN_SECONDS,
      SERVICE_CLOUD_S3_ACCESS_KEY_ID,
      SERVICE_CLOUD_S3_SECRET_ACCESS_KEY,
      SERVICE_CLOUD_S3_ENDPOINT
    } = process.env;

    await services.get(SERVICE_DATABASE).start({
      NODE_ENV,
      SERVICE_DB_CLIENT,
      SERVICE_DB_USER,
      SERVICE_DB_HOST,
      SERVICE_DB_PASSWORD,
      SERVICE_DB_DATABASE,
      SERVICE_DB_CHARSET,
      SERVICE_DB_PORT
    });

    return services;
  }

  async stop() {}
}

export default new ServicesLoader();
