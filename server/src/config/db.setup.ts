import {neon} from "@neondatabase/serverless";

const DB_API = Bun.env.DB_API;
if (!DB_API) {
    throw Error(`Missing DB for serverless database.`);
}

export const DB = neon(DB_API)