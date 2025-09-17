FROM oven/bun AS build

WORKDIR /app

COPY package.json package.json
COPY bun.lock bun.lock

RUN bun install

COPY ./src ./src

ENV NODE_ENV=production
ENV PORT=8080

RUN bun build \
    --compile \
    --minify-whitespace \
    --minify-syntax \
    --target bun \
    --outfile server \
    ./src/index.ts

WORKDIR /app

COPY --from=build /app/server server

ENV NODE_ENV=production
ENV PORT=8080

CMD ["./server"]

EXPOSE 8080