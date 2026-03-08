import sql from 'mssql'

const config: sql.config = {
  server: process.env.AZURE_SQL_SERVER!,      // stevenai-test2.database.windows.net
  database: process.env.AZURE_SQL_DATABASE!,  // free-sql-db-4096674
  port: 1433,
  user: process.env.AZURE_SQL_USER!,          // sa66123
  password: process.env.AZURE_SQL_PASSWORD!,
  connectionTimeout: 60000,
  options: {
    encrypt: true,
    trustServerCertificate: false,
  },
}

// Singleton pool — reused across hot-reloads in dev
declare global {
  // eslint-disable-next-line no-var
  var _mssqlPool: sql.ConnectionPool | undefined
}

export async function getDbPool(): Promise<sql.ConnectionPool> {
  if (!global._mssqlPool || !global._mssqlPool.connected) {
    global._mssqlPool = await new sql.ConnectionPool(config).connect()
  }
  return global._mssqlPool
}
