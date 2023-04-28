import { type z } from "zod";
import { type customValidator } from "./validator";

type DBUsers = z.infer<(typeof customValidator)["db"]["user_credential"]>;

export type { DBUsers };
