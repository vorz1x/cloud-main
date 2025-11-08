import { Hono } from "hono";
import path from "node:path";
import { loadRoutes } from "./utils/startup/loadRoutes";
import { cloud } from "./utils/handlers/errors";
import logger from "./utils/logger/logger";
import { cors } from "hono/cors";
import { $ } from "bun";

const app = new Hono({ strict: false });

export default app;

app.use("*", cors());

app.notFound((c) => c.json(cloud.basic.notFound, 404));

Bun.serve({
  port: 3551,
  fetch: app.fetch,
});

app.use(async (c, next) => {
  if (c.req.path === "/images/icons/gear.png" || c.req.path === "/favicon.ico") await next();
  else {
    await next();

    logger.backend(`${c.req.path} | ${c.req.method} | Status ${c.res.status}`);
  }
});

await loadRoutes(path.join(__dirname, "routes"), app);

logger.backend("cloud started on port 3551");
