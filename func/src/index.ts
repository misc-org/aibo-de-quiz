import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { StoreError, createHono } from "lib/constant";
import { Store } from "lib/store";

const app = createHono();

const route = app.post(
  "/",
  zValidator(
    "json",
    z.object({
      uuid: z.string(),
    })
  ),
  async (ctx) => {
    const store = new Store(ctx.env.DB, "123");
    try {
      await store.putUser({
        uuid: ctx.req.valid("json").uuid,
        access_token: "ccc",
        expires_at: 123,
        refresh_token: "rss ",
      });
    } catch (err) {
      if (err instanceof StoreError) {
        return ctx.text(err.message, 409);
      }
    }

    return ctx.text("created!", 201);
  }
);

export type AppType = typeof route;
export default app;
