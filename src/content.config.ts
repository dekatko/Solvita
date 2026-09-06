import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const standorte = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/standorte' }),
  schema: z.object({
    city: z.string(),
    title: z.string(),
    metaDescription: z.string(),
    intro: z.string(),
    localFacts: z.array(z.string()),
  }),
});

const ratgeber = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/ratgeber' }),
  schema: z.object({
    title: z.string(),
    metaDescription: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
  }),
});

export const collections = { standorte, ratgeber };
