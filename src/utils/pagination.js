/**
 *
 * @param {Object} pagination
 * @param {number} total
 * @returns
 */
export function buildMeta(pagination, total) {
  const { page, pageSize } = pagination;

  const totalPages = Math.ceil(total / pageSize);

  return {
    currentPage: page,
    pageSize,
    totalPages,
    totalCount: total
  };
}
