import Elysia, { t } from "elysia";
import cors from "@elysiajs/cors";
import { server_config } from "./global.env";

console.log(server_config.FRONTEND_URLS[0])

export const CorsDefault = new Elysia()
    .use(cors({
        origin: server_config.FRONTEND_URLS,
        methods: "*",
        credentials: true,
        allowedHeaders: true,
    }))

// export const CorsLogout = new Elysia()
//     .use(cors({
//         origin: server_config.FRONTEND_URLS,
//         methods: "*",
//         credentials: true,
//         allowedHeaders: true,
//     }))
