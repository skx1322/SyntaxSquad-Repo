import { Elysia } from "elysia";
import { server_config } from "./config/global.env";
import router from "./router/router";

const app = new Elysia();

app.use(router);

app.listen(server_config.PORT, () => {
  console.log(
    `ElysiaJS is running at ${app.server?.hostname}:${app.server?.port}`
  );
})