import { z } from "zod";

const customValidator = {
  jwtPayload: z.object({
    iss: z.string(),
    sub: z.string(),
    iat: z.number(),
    exp: z.number(),
  }),
  db: {
    user_credential: z.object({
      uuid: z.string(),
      access_token: z.string(),
      expires_at: z.number(),
      refresh_token: z.string(),
    }),
  },
};

export { customValidator };
