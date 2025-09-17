import Elysia from "elysia";
import { rateLimit } from "elysia-rate-limit";

export const otp_limiter = new Elysia().use(rateLimit({
    duration: 1 * 60 * 1000,
    max: 20,
    errorResponse: `Too many requests.`,
}));