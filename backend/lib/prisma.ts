import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";
const connectionString = `${process.env.DATABASE_URL}`;
const runtimeEnv = process.env.ENV
const adapterOptions: any = { connectionString };
if (runtimeEnv === "prod") {
  adapterOptions.ssl = { rejectUnauthorized: false };
}
const adapter = new PrismaPg(adapterOptions);
const prisma = new PrismaClient({ adapter });
export { prisma };
