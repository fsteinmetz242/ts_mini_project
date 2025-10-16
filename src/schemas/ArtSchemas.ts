import z from "zod";

const dimensions_detail = z.object([
  {
    depth: z.nullable(z.number()),
    width: z.number(),
    height: z.number(),
    diameter: z.nullable(z.number()),
    clarification: z.nullable(z.number()),
  },
]);

export const ArtPaginationSchema = z.object({
  total: z.number(),
  limit: z.number(),
  offset: z.number(),
  total_pages: z.number(),
  current_page: z.number(),
  prev_url: z.url().optional(),
  next_url: z.url().optional(),
});

export const ThumbnailSchema = z.object({
  lqip: z.nullable(z.string()),
  width: z.number().nullable(),
  height: z.number().nullable(),
  alt_text: z.nullable(z.string()),
});

export const ArtworkSchema = z.object({
  id: z.number(),
  title: z.nullable(z.string()),
  thumbnail: ThumbnailSchema.nullable(),
  main_reference_number: z.nullable(z.string()),
  date_display: z.nullable(z.string()),
  artist_display: z.nullable(z.string()),
  description: z.nullable(z.string()),
});

export const ArtDataSchema = z.array(ArtworkSchema);

export const ArtInfoSchema = z.object({
  license_text: z.nullable(z.string()),
  license_links: z.array(z.url()),
  version: z.nullable(z.string()),
});

export const ArtConfigSchema = z.object({
  iiif_url: z.url(),
  website_url: z.url(),
});

export const ArtResponseSchema = z.object({
  config: ArtConfigSchema,
  data: ArtworkSchema,
  info: ArtInfoSchema,
});

export const ArtPageResponseSchema = z.object({
  pagination: ArtPaginationSchema,
  config: ArtConfigSchema,
  data: ArtDataSchema,
  info: ArtInfoSchema,
});
