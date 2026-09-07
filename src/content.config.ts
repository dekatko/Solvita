import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Every collection enforces the same metadata constraints from CLAUDE.md:
// title <= 60 chars, description 140-158 chars. Astro's content layer
// validates against this schema at build/sync time and throws on
// violation — an over-length title or description fails the build,
// it does not just warn.
const seoFields = {
  title: z.string().max(60),
  description: z.string().min(140).max(158),
};

const leistungen = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/leistungen' }),
  schema: z.object({
    ...seoFields,
    h1: z.string(),
    summary: z.string(),
    manufacturers: z.array(z.string()).optional(),
  }),
});

const orte = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/orte' }),
  schema: z.object({
    ...seoFields,
    h1: z.string(),
    city: z.string(),
    intro: z.string(),
  }),
});

const ratgeber = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/ratgeber' }),
  schema: z.object({
    ...seoFields,
    h1: z.string(),
    targetQuery: z.string(),
    relatedService: z.string(),
    publishDate: z.coerce.date(),
    draft: z.boolean().default(true),
  }),
});

const referenzen = defineCollection({
  // Empty until real project data arrives from the client — see
  // docs/OPEN-FACTS.md. Schema is defined ahead of time so real
  // entries can be dropped in without further code changes.
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/referenzen' }),
  schema: z.object({
    ...seoFields,
    h1: z.string(),
    city: z.string(),
    kwp: z.number(),
    orientation: z.string(),
    storageKwh: z.number().optional(),
    annualYieldKwh: z.number().optional(),
  }),
});

export const collections = { leistungen, orte, ratgeber, referenzen };
