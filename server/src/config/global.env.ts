export const server_config = {
    PORT: Bun.env.PORT ?? 3000,
    FRONTEND_URLS: JSON.parse(Bun.env.FRONTEND_URL ?? '["http://localhost:5173", "http://localhost:8080"]'),
    JWT_KEY: Bun.env.JWT_SECRETKEY,
};
