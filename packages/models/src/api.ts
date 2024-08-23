import type { ZodError } from "zod";

export type DefaultResponse<T> =
  | {
      data: T;
    }
  | {
      errorMessage: string;
      error?: ZodError | null;
    };
