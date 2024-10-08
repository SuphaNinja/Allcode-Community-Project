import { PrismaClient } from '@prisma/client';
import { createClient } from "@libsql/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import dotenv from 'dotenv';

dotenv.config();

let prisma;

if (process.env.NODE_ENV === "development") {
    // Local development configuration
    prisma = new PrismaClient();
} else {
    // Production configuration
    const libsql = createClient({
        url: process.env.TURSO_DATABASE_URL,
        authToken: process.env.TURSO_AUTH_TOKEN,
    });

    const adapter = new PrismaLibSQL(libsql);
    prisma = new PrismaClient({ adapter });
}

export default prisma;
