import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const envFound		 = dotenv.config();

if (!envFound)
{
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
    port				: parseInt(process.env.SERVER_PORT, 10),
    databaseHost		: process.env.DATABASE_HOST,
    databaseLogin 	    : process.env.DATABASE_LOGIN,
    databasePassword 	: process.env.DATABASE_PASSWORD,
    databaseName		: process.env.DATABASE_NAME,
    databasePort 		: 27017,
    jwtSecret			: process.env.JWT_SECRET,
    sqlDatabaseHost     : process.env.SQL_DATABASE_HOST,
    sqlDatabaseLogin    : process.env.SQL_DATABASE_LOGIN,
    sqlDatabasePassword : process.env.SQL_DATABASE_PASSWORD,
    sqlDatabaseName		: process.env.SQL_DATABASE_NAME,
    sqlDatabasePort 	: process.env.SQL_DATABASE_PORT,

    logs: {
        level: process.env.LOG_LEVEL || 'silly',
    },

    api: 	{
        prefix: '/api',
    },
};
