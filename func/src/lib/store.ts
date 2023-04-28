import { StoreError } from "./constant";
import { type DBUsers } from "./types/db";

export class Store {
  constructor(private readonly db: D1Database, private readonly uuid: string) {}

  private async userExists(uuid: string): Promise<boolean> {
    let existsResult: D1Result | undefined;
    try {
      existsResult = await this.db
        .prepare("SELECT * FROM user_credential WHERE uuid = ?")
        .bind(uuid)
        .first();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      throw new StoreError(
        JSON.stringify({ summary: err.message, detail: err.cause.message })
      );
    }

    if (existsResult === undefined) {
      throw new StoreError("Failed to check whether user exists");
    }

    return existsResult !== null;
  }

  async putUser(user: DBUsers): Promise<void> {
    if (await this.userExists(user.uuid)) {
      console.log("User already exists, updating tokens");
    }

    let insertResult: D1Result | undefined;
    try {
      insertResult = await this.db
        .prepare(
          "REPLACE INTO user_credential (uuid, access_token, expires_at, refresh_token) VALUES (?, ?, ?, ?)"
        )
        .bind(user.uuid, user.access_token, user.expires_at, user.refresh_token)
        .run();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      throw new StoreError(
        JSON.stringify({ summary: err.message, detail: err.cause.message })
      );
    }

    if (!insertResult?.success) {
      throw new StoreError("Failed to store tokens");
    }
  }

  async getUserData(): Promise<DBUsers> {
    let userResult: DBUsers | undefined;
    try {
      userResult = await this.db
        .prepare("SELECT * FROM user_credential WHERE uuid = ?")
        .bind(this.uuid)
        .first();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      throw new StoreError(
        JSON.stringify({ summary: err.message, detail: err.cause.message })
      );
    }

    if (userResult == null) {
      throw new StoreError("Uuid not found", 403);
    }

    return userResult;
  }
}
