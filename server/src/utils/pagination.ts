// import {sql} from 'drizzle-orm';
// import type {PgSelect} from 'drizzle-orm/pg-core';

// import {Pagination, QueryStringPagination} from '../types';

// export async function paginateQuery<T extends PgSelect>({
//   query,
//   QueryStringPagination,
// }: {
//   query: T;
//   QueryStringPagination: QueryStringPagination;
// }): Promise<{data: T[]; pagination: Pagination}> {
//   const subQuery = query.as('sub');
//   const totalRecordsQuery = db
//     .select({total: sql<number>`count(*)`})
//     .from(subQuery);

//   const totalRecordsResult = await totalRecordsQuery.execute();
//   const totalRecords = Number(totalRecordsResult[0].total);
//   const totalPages = Math.ceil(totalRecords / QueryStringPagination.limit);

//   query
//     .limit(QueryStringPagination.limit)
//     .offset((QueryStringPagination.page - 1) * QueryStringPagination.limit);

//   const results = (await query.execute()) as T[];

//   return {
//     data: results,
//     pagination: {
//       totalRecords: totalRecords,
//       totalPages: totalPages,
//       currentPage: QueryStringPagination.page,
//       limit: QueryStringPagination.limit,
//     },
//   };
// }
