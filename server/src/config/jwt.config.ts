import { jwt } from "@elysiajs/jwt";
import { Elysia, t } from "elysia";
import { server_config } from "./global.env";

const secret_key = server_config.JWT_KEY;
if (!secret_key) {
    throw Error(`Missing JWT Key in setup`);
}

export const JWT_Login = new Elysia()
    .use(jwt({
        name: 'JWT_Login',
        schema: t.Object({
            sessionID: t.String(),
        }),
        secret: secret_key,
        exp: "24h",
    }))

export const JWT_Extend = new Elysia()
    .use(jwt({
        name: 'JWT_Extend',
        schema: t.Object({
            sessionID: t.String(),
        }),
        secret: secret_key,
        exp: "7d",
    }))