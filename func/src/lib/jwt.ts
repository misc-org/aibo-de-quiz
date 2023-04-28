import jwt from "@tsndr/cloudflare-worker-jwt";
import { InvalidJwtError, type ENV } from "./constant";
import { type JwtPayload } from "./types/res_req";
import { customValidator } from "./types/validator";

export class Jwt {
  constructor(private readonly env: ENV) {}

  async create(uuid: string): Promise<string> {
    const nowUnix = Math.floor(Date.now() / 1000);

    const payload: JwtPayload = {
      iss: this.env.HOST_URL,
      sub: uuid,
      iat: nowUnix,
      exp: nowUnix + 3600,
    };

    return await jwt.sign(payload, this.env.CLIENT_SECRET);
  }

  async decode(bearer: string): Promise<JwtPayload> {
    const isValid = await jwt.verify(bearer, this.env.CLIENT_SECRET);
    if (!isValid) throw new InvalidJwtError("Invalid JWT or Expired");

    const { payload } = jwt.decode(bearer);

    if (payload === undefined || payload === null) {
      throw new InvalidJwtError("Decoded JWT is undefined");
    }

    let typedPayload: JwtPayload;

    try {
      typedPayload = customValidator.jwtPayload.parse(payload);
    } catch {
      throw new InvalidJwtError("Parse JWT failed");
    }

    if (typedPayload.iss !== this.env.HOST_URL) {
      throw new InvalidJwtError("Invalid JWT issuer");
    }

    if (typedPayload.exp < Math.floor(Date.now() / 1000)) {
      throw new InvalidJwtError("JWT expired");
    }

    return typedPayload;
  }

  async toUuid(bearer: string): Promise<string> {
    const payload = await this.decode(bearer);
    return payload.sub;
  }
}
