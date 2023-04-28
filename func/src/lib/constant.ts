import { Hono } from "hono";
import { type z } from "zod";

type ENV = {
  DB: D1Database;
  HOST_URL: string;
  CLIENT_ID: string;
  CLIENT_SECRET: string;
  TENANT_ID: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type toZod<T extends Record<string, any>> = {
  [K in keyof T]-?: z.ZodType<T[K]>;
};

type valueOf<T> = T[keyof T];

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function createHono() {
  return new Hono<{ Bindings: ENV }>();
}

function getApiEndpoint(path: string): string {
  return "https://graph.microsoft.com/v1.0" + path;
}

class NetworkError extends Error {
  constructor(reason: string) {
    super(JSON.stringify({ message: "Network Error", reason }));
  }
}

class ResponseNotOkError extends Error {
  constructor(message: string, reason: string) {
    super(JSON.stringify({ message, reason }));
  }
}

class InvalidJwtError extends Error {
  constructor(reason: string, public status?: number) {
    super(
      JSON.stringify({
        message: "Invalid JWT Error",
        reason,
      })
    );
  }
}

class StoreError extends Error {
  constructor(reason: string, public status?: number) {
    super(JSON.stringify({ message: "Store Error", reason }));
  }
}

export {
  createHono,
  getApiEndpoint,
  NetworkError,
  StoreError,
  ResponseNotOkError,
  InvalidJwtError,
};
export type { ENV, toZod, valueOf };
