import Elysia, { t } from "elysia";
import cors from "@elysiajs/cors";
import { server_config } from "./global.env";

export const CorsDefault = new Elysia()
    .use(cors({
        origin: server_config.FRONTEND_URLS,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        credentials: true,
        allowedHeaders: true,
    }))

export const CorsLogout = new Elysia()
    .use(cors({
        origin: server_config.FRONTEND_URLS,
        methods: "*",
        credentials: true,
        allowedHeaders: true,
    }))
