import { Elysia } from "elysia";
import { server_config } from "./config/global.env";
import router from "./router/router";
import { openapi } from "@elysiajs/openapi";

const app = new Elysia().use(openapi({
}));

app.use(router);

app.listen(server_config.PORT, () => {
  console.log(
    `ElysiaJS is running at ${app.server?.hostname}:${app.server?.port}`
  );
})