import type z from "zod/v4";
import type {
  ArtworkSchema,
  ArtPageResponseSchema,
} from "../schemas/ArtSchemas";

export type ArtworkType = z.infer<typeof ArtworkSchema>;
export type ArtworkPageType = z.infer<typeof ArtPageResponseSchema>;
