"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oracleDbConfig = void 0;
function oracleDbConfig() {
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
exports.oracleDbConfig = oracleDbConfig;
//# sourceMappingURL=database.config.js.map