import { z } from 'zod';

export const CreateKpiSchema = z.object({
  title: z.string().nonempty('Title is required'),
  description: z.string().optional(),
  colorCode: z
    .string()
    .regex(/^#([0-9A-Fa-f]{3}){1,2}$/, 'Invalid hex color code')
    .nonempty('Color code is required'),
});