import { ConfigService } from "@nestjs/config";

/**
 * Oracle db config
 */
 export function oracleDbConfig() {
  const host = process.env.ORACLE_HOST;
  const port = process.env.ORACLE_PORT;
  const user = process.env.ORACLE_USERNAME;
  const password = process.env.ORACLE_PASSWORD;
  const serviceName = process.env.ORACLE_DB;
  
    return {
      user: user,
      password: password,
      connectString: `${host}:${port}/${serviceName}`,
    };
  }