import Elysia from "elysia";
import userAccount from "../controllers/user.controller";
import { CorsDefault } from "../config/cors.config";

const router = new Elysia({ prefix: "/api" });

router.group("", (app) =>
    app
        .use(CorsDefault)
        .use(userAccount)
)

export default router;
