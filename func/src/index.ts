import { createHono } from "lib/constant";

const app = createHono();

app.get("/", (c) => {
  return c.text("welcome to hono!");
});

export default app;
