import type { Request } from 'express';
import { z } from 'zod';

import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from './const.js';

export const PaginationSchema = z.object({
  page: z.coerce.number().min(1).default(DEFAULT_PAGE).optional(),
  pageSize: z.coerce.number().min(1).max(100).default(DEFAULT_PAGE_SIZE).optional()
});

export const Pagination = (req: Request) => {
  const pagination = PaginationSchema.safeParse({
    page: req.query.page,
    pageSize: req.query.pageSize
  });

  if (!pagination.success) {
    throw new Error('Invalid pagination');
  }

  return pagination.data;
};

export type Pagination = z.infer<typeof PaginationSchema>;
